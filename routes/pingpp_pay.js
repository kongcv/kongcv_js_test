'use strict';
var url_parser = require('url');
var router = require('express').Router();
//Kongcv@online_pay&2016
var kongcv_key = "80b5b4e822f60d0254d885a7c20f7a87";
//test key id
var PINGPP_API_KEY = "sk_test_zrDKuD1Oqnb9aLu1iLWbnbT8";
//var PINGPP_APP_ID = "app_jTC8uTG8yj14b5GO";
var PINGPP_APP_ID = "app_T80WzLmTyXDSfrv5";
//release key id 
//var PINGPP_API_KEY = "sk_live_vDSGyD8aPGWL1mn9eLGSyj5K";
//var PINGPP_APP_ID = "app_jTC8uTG8yj14b5GO";

var WX_PUB_APP_ID = "wx6455d57243343aa4";
var WX_PUB_APP_SECRET = "e5d7c81fcdc2f4c39c19612234544e6b";

var pingpp = require('../lib_pingpp/pingpp')(PINGPP_API_KEY);
var pay_charge = require('../pay_trade');
var crypto = require("crypto");
var fs  = require("fs");

var verify_signature = function(raw_data, signature, pub_key_path) {
    var verifier = crypto.createVerify('RSA-SHA256').update(raw_data, "utf8");
    var pub_key = fs.readFileSync(pub_key_path, "utf8");
    return verifier.verify(pub_key, signature, 'base64');
}

var createPayment = function(order_no, channel, amount, client_ip, open_id, subject, pay_info, cb){
    var extra = {};
    switch (channel) {
        case 'alipay_wap':
            extra = {
                'success_url': 'http://www.yourdomain.com/success',
                'cancel_url': 'http://www.yourdomain.com/cancel'
            };
            break;
        case 'upacp_wap':
            extra = {
                'result_url': 'http://www.yourdomain.com/result'
            };
            break;
        case 'upmp_wap':
            extra = {
                'result_url': 'http://www.yourdomain.com/result?code='
            };
            break;
        case 'bfb_wap':
            extra = {
                'bfb_login': true,
                'result_url': 'http://www.yourdomain.com/success'
            };
            break;
        case 'wx_pub':
            extra = {
                'open_id': open_id
            };
            break;
    }
    // 商户系统自己生成的订单号。如果是【壹收款】，则使用客户端传上来的 'order_no'。
    pingpp.charges.create({
        order_no:  order_no,
        app:       {id: PINGPP_APP_ID},
        channel:   channel,
        amount:    amount,
        client_ip: client_ip,
        currency:  "cny",
        subject:   subject,
        body:      pay_info,
        extra:     extra
        //description: pay_type   //new add
    }, cb);
};

router.post('/', function(req, resp, next) {
    console.log("receive pingpp_pay");
    var check_kongcv_key = req.headers['x-kongcv-key-signatures'];
    if (kongcv_key != check_kongcv_key) {
        return resp.status(400).send('error:key signatures error');
    }
    
    var client_ip = req.connection.remoteAddress;
    if (client_ip[0] === ':') {
        client_ip = client_ip.substring(7);
    }
    var params = req.body;
        
    var order_no = params["order_no"];
    if (order_no === undefined || order_no.length === 0) {
        return resp.status(400).send('error:charge order_no undefined');
    }
    
    var channel = params["channel"].toLocaleLowerCase();
    if (channel === undefined || channel.length === 0) {
        return resp.status(400).send('error:charge channel undefined');
    }
    
    var amount = Math.round(params["amount"] * 100);
    if (amount === undefined || amount.length === 0) {
        return resp.status(400).send('error:charge amount undefined');
    }
    
    var open_id = params["open_id"];
    if (open_id === undefined || open_id.length === 0) {
        return resp.status(400).send('error:charge open_id undefined');
    }

    var subject = params["subject"];
    if (subject === undefined || subject.length === 0) {
        return resp.status(400).send('error:charge subject undefined');
    }
    subject = "空车位订单-" + order_no;
    
    var pay_info = params["pay_info"];
    if (pay_info === undefined || pay_info.length === 0) {
        return resp.status(400).send('error:charge pay_info undefined');
    }
    
    var json_obj = eval("(" + pay_info + ")");
    var coupon = json_obj["cp"];
    if (coupon === undefined || coupon.length === 0) {
        return resp.status(400).send('notify pay_info.coupon undefined');
    }
     
    var pay_type = json_obj["pt"];
    if (pay_type === undefined || pay_type.length === 0) {
        return resp.status.send('notify pay_info.pay_type undefined');
    }
    
    var mode = json_obj["md"];
    if (mode === undefined || mode.length === 0) {
        return resp.status(400).send('notify pay_info.mode undefined');
    }
    
    console.log("pay_info", pay_info);

    createPayment(order_no, channel, amount, client_ip, open_id, subject, pay_info, function(err, charge) {
        if (charge != null) {
            return resp.send(charge);
        }
        return resp.send({error:err.raw});
    });
});

router.post('/notify', function(req, resp, next) {
    console.log("receive ping_pay notify");
    // 异步通知
    var notify = req.body;
    
    var pub_key_path = __dirname + "/rsa_public_key.pem";
    var signature = req.headers['x-pingplusplus-signature'];

    if (notify.type === undefined) {
        return resp.status(400).send('error:notify type undefined');
    }

    var notify_id = notify.id;
    if (notify_id === undefined || notify_id.length === 0) {
        return resp.status(400).send('error:notify id undefined');
    }

    var charge = notify.data.object;
    if (charge === undefined || charge.length === 0) {
        return resp.status(400).send('error:notify charge undefined');
    }

    var pay_id = charge.id;
    if (pay_id === undefined || pay_id.length === 0) {
        return resp.status(400).send('error:notify charge.id undefined');
    }

    var bill_id = charge.order_no;
    if (bill_id === undefined || bill_id.length === 0) {
        return resp.status(400).send('error:notify charge.order_no undefined');
    }

    var pay_tool = charge.channel;
    if (pay_tool === undefined || pay_tool.length === 0) {
        return resp.status(400).send('error:notify charge.channel undefined');
    }

    var money = charge.amount / 100;
    if (money === undefined || money.length === 0) {
        return resp.status(400).send('error:notify charge.amount undefined');
    }
 
    var paid = charge.paid;
    if (paid != true) {
        return resp.status(400).send('error:notify charge.paid false');
    }

    var body = notify.data.object.body;
    if (body === undefined || body.length === 0) {
        return resp.status(400).send('error:notify body undefined');
    }
 
    var json_obj = eval("(" + body + ")");
    var coupon = json_obj["cp"];
    if (coupon === undefined || coupon.length === 0) {
        return resp.status(400).send('error:notify body.coupon undefined');
    }

    var pay_type = json_obj["pt"];
    if (pay_type === undefined || pay_type.length === 0) {
        return resp.status(400).send('error:notify body.pay_type undefined');
    }

    var mode = json_obj["md"];
    if (mode === undefined || mode.length === 0) {
        return resp.status(400).send('error:notify body.mode undefined');
    }

    //v1.0.3 add no decide
    var coupon_id = json_obj["cd"];
    
    var mobile = json_obj["mb"];
    var device_token = json_obj["tk"];
    var device_type = json_obj["tp"];
    
    switch (notify.type) {
        case "charge.succeeded":
            var param = {
                bill_id : bill_id,
                money : money,
                pay_tool : pay_tool,
                pay_id : pay_id,
                notify_id : notify_id,
                coupon : coupon,
                coupon_id : coupon_id,
                pay_type : pay_type,
                mode : mode
            };
            
            if (verify_signature(JSON.stringify(notify), signature, pub_key_path)) {
                console.log('ping++ verification succeeded');
            } 
            else { 
                pay_charge.kongcv_insert_trade_log(bill_id, param, "{'error':'ping++ verification failed'}");
                return resp.status(400).send('error:ping++ verification failed');
            }

            pay_charge.kongcv_put_trade_billdata(param);
            
            pay_charge.kongcv_trade_jpush_message_p2p(mobile, device_token, device_type, money, mode);
 
            return resp.status(200).send("success");
            break;
        case "refund.succeeded":
            return resp.status(200).send("success");
            break;
        default:
            return resp.status(400).send("don't know notify type");
            break;
    }
});

router.get('/oauth', function(req, resp, next) {
    console.log("kongcv oauth");

    var oauth_url = pingpp.wxPubOauth.createOauthUrlForCode(WX_PUB_APP_ID, 'http://kongcv_test.leanapp.cn/pingpp_pay/getopenid/');
    console.log("oauth_url:", oauth_url);

    resp.writeHead(302, {"Location":oauth_url});
    resp.end('');
});

router.get('/getopenid', function(req, resp, next) {
    console.log("kongcv getopenid");
    console.log("req url:", req.url);
    var url_parts = url_parser.parse(req.url, true);
    var code = url_parts.query.code;
    console.log("code:", code);
    
    pingpp.wxPubOauth.getOpenid(WX_PUB_APP_ID, WX_PUB_APP_SECRET, url_parts.query.code, function(err, openid) {
        console.log("open_id", openid);
    });
});

router.post('/signature', function(req, resp, next) {
    console.log("kongcv signature");
    
    pingpp.wxPubOauth.getJsapiTicket(WX_PUB_APP_ID, WX_PUB_APP_SECRET, function(err, response){
        var charge = {};
        var signature = pingpp.wxPubOauth.getSignature(charge, response['ticket'],'PAY_PAGE_URL');
        resp.writeHead(200);
        resp.end(signature);
    });
});

module.exports = router;
