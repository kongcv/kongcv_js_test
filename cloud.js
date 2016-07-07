var AV = require('leanengine');
var JPush = require("./lib_jpush/JPush.js");

//jpush AppKey,MasterSecret
//release
//var JPush_client = JPush.buildClient('fa4a60e2a3926c041d9fada8','4dde597eb77d1f3219e793e2');
//var JPush_production = true;
//debug
var JPush_client = JPush.buildClient('ca9af5e8766e94552a733c1e','9d1c242d31e803e77dbfa8f2');
var JPush_production = false;

var ERROR_MSG = {
    'ERR_USER_MOBILE_MUST_EXIST' : '{"state":"error", "code":0, "error":"手机号不能为空"}',
    'ERR_USERNAME_MUST_EXIST' : '{"state":"error", "code":1, "error":"用户名不能为空"}',
    'ERR_SMSCODE_MUST_EXIST' : '{"state":"error", "code":2, "error":"手机验证码不能为空"}',
    'ERR_CITY_MUST_EXIST' : '{"state":"error", "code":3, "error":"城市不能为空"}',
    'ERR_ADDRESS_MUST_EXIST' : '{"state":"error", "code":4, "error":"道路地址不能为空"}',
    'ERR_HIRE_START_MUST_EXIST' : '{"state":"error", "code":5, "error":"出租开始日期不能为空"}',
    'ERR_HIRE_END_MUST_EXIST' : '{"state":"error", "code":6, "error":"出租结束日期不能为空"}',
    'ERR_LOCATION_INFO_MUST_EXIST' : '{"state":"error", "code":7, "error":"地理位置信息不能为空"}',
    'ERR_HIRE_METHOD_MUST_EXIST' : '{"state":"error", "code":7, "error":"出租方式信息不能为空"}',
    'ERR_HIRE_PRICE_MUST_EXIST' : '{"state":"error", "code":8, "error":"出租价格信息不能为空"}',
    'ERR_INFO_FORMAT' : '{"state":"error", "code":9, "error":"请求信息格式错误"}',
    'ERR_HIRE_PARK_SAME_RECORD' : '{"state":"error", "code":10, "error":"出租信息-车位有相同记录,请重新编辑位置信息"}',
    'ERR_HIRE_COMMUNITY_RECORD_LIMIT' : '{"state":"error", "code":11, "error":"出租信息-社区车位用户最多发20条记录"}',
    'ERR_MODE_MUST_EXIST' : '{"state":"error", "code":12, "error":"停车模式不存在"}',
    'ERR_MODE_NO_EXIST' : '{"state":"error", "code":13, "error":"停车模式数据格式存在错误"}',
    'ERR_MAX_DISTANCE_MUST_EXIST' : '{"state":"error", "code":14, "error":"最大距离不能为空"}',
    'ERR_SKIP_MUST_EXIST' : '{"state":"error", "code":15, "error":"跳过记录数设置必须设置"}',
    'ERR_LIMIT_MUST_EXIST' : '{"state":"error", "code":16, "error":"限定记录数设置必须设置"}',
    'ERR_PARK_TYPE_MUST_EXIST' : '{"state":"error", "code":17, "error":"出租类型不能为空"}',
    'ERR_PARK_ID_MUST_EXIST' : '{"state":"error", "code":18, "error":"出租车位ID不能为空"}',
    'ERR_PARK_PREORDER_EXIST' : '{"state":"error", "code":19, "error":"车位已被预订,请稍后10分钟内再来查看"}',
    'ERR_USER_ID_MUST_EXIST' : '{"state":"error", "code":20, "error":"用户ID不能为空"}',
    'ERR_SYSTEM_TRADE' : '{"state":"error", "code":20, "error":"系统交易数据错误"}',
    'ERR_SYSTEM_PREORDER' : '{"state":"error", "code":21, "error":"系统预订数据错误"}',
    'ERR_COMMENT_MUST_EXIST' : '{"state":"error", "code":22, "error":"必须有评论数据"}',
    'ERR_PUSH_TYPE_MUST_EXIST' : '{"state":"error", "code":23, "error":"推送类型必须设定"}',
    'ERR_DEVICE_TYPE_MUST_EXIST' : '{"state":"error", "code":24, "error":"设备类型必须设定"}',
    'ERR_DEVICE_TOKEN_MUST_EXIST' : '{"state":"error", "code":25, "error":"设备TOKEN必须设定"}',
    'ERR_JPUSH_EXTRAS_MUST_EXIST' : '{"state":"error", "code":26, "error":"附加推送数据必须存在"}',
    'ERR_TRADE_ID_MUST_EXIST' : '{"state":"error", "code":27, "error":"交易单id必须存在"}',
    'ERR_PARK_ACCEPT_EXIST' : '{"state":"error", "code":28, "error":"你在规定的10分钟内已接受了一次租用请求,请稍后再决定是否接受此次请求"}',
    'ERR_PARK_DATE_EXIST' : '{"state":"error", "code":29, "error":"你选择的租用日期与其他用户有冲突,请重新选择时间段"}', 
    'ERR_ACTION_MUST_EXIST' : '{"state":"error", "code":30, "error":"动作方式必须存在"}',
    'ERR_ROLE_MUST_EXIST' : '{"state":"error", "code":31, "error":"角色必须存在"}',
    'ERR_HIRER_MUST_EXIST' : '{"state":"error", "code":32, "error":"出租人必须存在"}',
    'ERR_EXTRA_FLAG_MUST_EXIST' : '{"state":"error", "code":33, "error":"额外标识必须存在"}',
    'ERR_TRADE_STATE_MUST_EXIST' : '{"state":"error", "code":34, "error":"交易状态必须存在"}',
    'ERR_QUERY_DATE_MUST_EXIST' : '{"state":"error", "code":34, "error":"查询日期必须存在"}',
    'ERR_PAY_STATE_MUST_EXIST' : '{"state":"error", "code":35, "error":"支付状态必须存在"}',
    'ERR_FEEDBACK_MUST_EXIST' : '{"state":"error", "code":36, "error":"反馈必须存在"}',
    'ERR_MESSAGE_ID_MUST_EXIST' : '{"state":"error", "code":37, "error":"消息ID不能为空"}',
    'ERR_MONEY_MUST_EXIST' : '{"state":"error", "code":38, "error":"金额数不能为空"}',
    'ERR_BANK_CARD_MUST_EXIST' : '{"state":"error", "code":39, "error":"银行卡不能为空"}',
    'ERR_PASSWD_MUST_EXIST' : '{"state":"error", "code":40, "error":"密码不能为空"}',
    'ERR_PURSE_CREATED' : '{"state":"error", "code":41, "error":"钱包已创建"}',
    'ERR_BILL_ID_MUST_EXIST' : '{"state":"error", "code":42, "error":"支付帐单id必须存在"}',
    'ERR_PAY_TOOL_MUST_EXIST' : '{"state":"error", "code":43, "error":"支付工具必须存在"}',
    'ERR_PAY_ID_MUST_EXIST' : '{"state":"error", "code":44, "error":"支付ID必须存在"}',
    'ERR_NOTIFY_ID_MUST_EXIST' : '{"state":"error", "code":45, "error":"通知ID必须存在"}',
    'ERR_PAY_TYPE_MUST_EXIST' : '{"state":"error", "code":46, "error":"支付类型必须存在"}',
    'ERR_COUPON_ONLY_ONE' : '{"state":"error", "code":47, "error":"一单交易优惠卷只能使用一次"}',
    'ERR_PAY_TOOL_MUST_SAME' : '{"state":"error", "code":48, "error":"支付工具必须一致"}',
    'ERR_PAY_TYPE_FORMAT' : '{"state":"error", "code":49, "error":"支付类型格式错误"}',
    'ERR_USER_SESSIONTOKEN_MUST_EXIST' : '{"state":"error", "code":50, "error":"用户sessiontoken不能为空"}',
    'ERR_PARK_DETAIL_MUST_EXIST' : '{"state":"error", "code":50, "error":"车位地址详情不能为空"}',
    'ERR_USERID_SESSIONTOKEN_UNMATCHED' : '{"state":"error", "code":51, "error":"user_id和sessionToken不匹配"}',
    'ERR_USER_NO_SIGNUP' : '{"state":"error", "code":52, "error":"用户没有注册"}',
    'ERR_PARK_NO_UPDATE' : '{"state":"error", "code":53, "error":"车位租用期间不能更新"}',
    'ERR_DATA_NO_EXIST' : '{"state":"error", "code":54, "error":"数据不存在"}', 
    'ERR_LOOP' : '{"state":"error", "code":55, "error":"loop error"}', 
    'ERR_HIDE_MUST_EXIST' : '{"state":"error", "code":56, "error":"屏蔽设置不能为空"}',
    'ERR_VERIFY_PASSWD' : '{"state":"error", "code":57, "error":"密码验证错误"}',
    'ERR_MONEY_WITHDRAW_DEPOSIT' : '{"state":"error", "code":58, "error":"提现金额大于余额"}',
    'ERR_TRADE_PRICE' : '{"state":"error", "code":59, "error":"交易金额错误"}',
    'ERR_HIRE_FIELD_MUST_EXIST' : '{"state":"error", "code":60, "error":"出租方法字段信息不能为空"}',
    'ERR_NO_AUTH' : '{"state":"error", "code":61, "error":"你不是车位创建者,你没有权限操作"}',
    'ERR_LOOP_REPEAT' : '{"state":"error", "code":62, "error":"loop error,重复执行"}', 
    'ERR_PARK_STRUCT_MUST_EXIST' : '{"state":"error", "code":63, "error":"车位结构不能为空"}', 
    'ERR_MESSAGE_STATE_MUST_EXIST' : '{"state":"error", "code":64, "error":"消息状态不能为空"}',
    'ERR_PARK_NO_SPACE' : '{"state":"error", "code":65, "error":"车位已被租用,请再找找其他车位吧"}',
    'ERR_PERSONAL_MUST_EXIST' : '{"state":"error", "code":66, "error":"车位所属性质必须存在"}',
    'ERR_HOUR_METER_FINISHED' : '{"state":"error", "code":67, "error":"计时收费已完成"}',
    'ERR_COMMUNITY_NAME_MUST_EXIST' : '{"state":"error", "code":68, "error":"社区名称不能为空"}',
    'ERR_PROPERTY_NAME_MUST_EXIST' : '{"state":"error", "code":69, "error":"物业名称不能为空"}',
    'ERR_RATE_MUST_EXIST' : '{"state":"error", "code":70, "error":"费率数据错误"}',
    'ERR_USER_NO_SAME' : '{"state":"error", "code":71, "error":"不能租用自己的车位"}',
    'ERR_PARK_SPACE_MUST_EXIST' : '{"state":"error", "code":72, "error":"空闲设置不能为空"}',
    'ERR_APP_TYPE_MUST_EXIST' : '{"state":"error", "code":73, "error":"app类型不能为空"}',
    'ERR_USERID_MUST_HAVE' : '{"state":"error", "code":74, "error":"用户id必须有"}',
    'ERR_COUPON_ID_MUST_HAVE' : '{"state":"error", "code":75, "error":"优惠卷id必须有"}',
    'ERR_VERSION_MUST_HAVE' : '{"state":"error", "code":76, "error":"版本号必须有"}',
    'ERR_EXCEPTION_MUST_HAVE' : '{"state":"error", "code":77, "error":"异常必须有"}',
    'ERR_COUPON_NUMBER_MUST_EXIST' : '{"state":"error", "code":78, "error":"优惠卷数据不能为空"}',
    'ERR_COUPON_NAME_MUST_EXIST' : '{"state":"error", "code"80, "error":"优惠卷名称不能为空"}',
    'ERR_COUPON_DESCRIPTION_MUST_EXIST' : '{"state":"error", "code":81, "error":"优惠卷描述不能为空"}',
    'ERR_SAME_COUPON_EXIST' : '{"state":"error", "code":82, "error":"已获得相同优惠卷,不能重复获得"}',
    'ERR_COUPON_TYPE_MUST_EXIST' : '{"state":"error", "code":83, "error":"优惠卷类型不能为空"}',
    'ERR_COUPON_USE_DAYS_MUST_EXIST' : '{"state":"error", "code":84, "error":"优惠卷使用天数不能为空"}',
    'ERR_AUTOPUSH_ID_MUST_EXIST' : '{"state":"error", "code":85, "error":"推送ID不能为空"}',
    'ERR_AUTOPUSH_OPEN_MUST_EXIST' : '{"state":"error", "code":86, "error":"推送状态不能为空"}',
    'ERR_LICENSE_PLATE_MUST_EXIST' : '{"state":"error", "code":87, "error":"车牌号不能为空"}',
    'ERR_SAME_AUTOPUSH_EXIST' : '{"state":"error", "code":88, "error":"已添加相同地点,请不要重复添加"}',
    'ERR_REPUTE_MUST_EXIST' : '{"state":"error", "code":89, "error":"评价不能为空"}',
};

var RESULT_MSG = {
    'RET_FAIL' : '{"state":"failed", "code":0, "msg":"失败"}',
    'RET_OK' : '{"state":"ok", "code":1, "msg":"成功"}'
};

var PUSH_INFO = {
    'VERIFY_ACCEPT' : '你好,你的请求已被确认,请立即支付!',
    'VERIFY_REJECT' : '你好,你的请求已被拒绝,可能别的用户已申请租用!',
    'VERIFY_REQUEST' : '你好,有一个新的租用请求,请及时回复!',
    'TRADE_CHARGE' : '你好,你的支付金额是:',
    'PURSE_CHARGE' : '你好,你的空车位钱包分期到帐金额',
    'PARK_PUSH' : '你好,你收到一个预设定的推送车位,车位位置:'
};

var debug_park_manager_role_id = "561e1b9b60b227b7f4ab449e";
var debug_worker_role_id = "561f4128ddb24819b7e4bc52";
var release_park_manager_role_id = "568c849e00b01b9f12ab8dbc";                   
var release_worker_role_id = "568c84cc60b2e57bf6570cc2";
var debug_marketer_role_id = "56ecbfc6816dfa005155bd54"
var debug_financial_role_id = "56ecbebfda2f60004c88938c"
var release_marketer_role_id = "56ecc28b816dfa005155d7c2"
var release_financial_role_id = "56ecc2967db2a2005205ee42"

var user_cls = AV.Object.extend("_User");
var image_file_cls = AV.Object.extend("_File");
var kongcv_hire_method_cls = AV.Object.extend("kongcv_hire_method");
var kongcv_advertise_cls = AV.Object.extend("kongcv_advertise");
var kongcv_park_type_cls = AV.Object.extend("kongcv_park_type");
var kongcv_park_community_cls = AV.Object.extend("kongcv_park_community");
var kongcv_park_curb_cls = AV.Object.extend("kongcv_park_curb");
var kongcv_trade_cls = AV.Object.extend("kongcv_trade");
var kongcv_trade_bill_cls = AV.Object.extend("kongcv_trade_bill");
var kongcv_loop_trade_cls = AV.Object.extend("kongcv_loop_trade");
var kongcv_preorder_cls = AV.Object.extend("kongcv_preorder");
var kongcv_accept_cls = AV.Object.extend("kongcv_accept");
var kongcv_comment_cls = AV.Object.extend("kongcv_comment");
var kongcv_push_message_cls = AV.Object.extend("kongcv_push_message");
var kongcv_feedback_cls = AV.Object.extend("kongcv_feedback");
var kongcv_white_list_cls = AV.Object.extend("kongcv_white_list");
var kongcv_purse_cls = AV.Object.extend("kongcv_purse");
var kongcv_bank_cls = AV.Object.extend("kongcv_bank");
var kongcv_info_cls = AV.Object.extend("kongcv_info");
var kongcv_service_file_cls = AV.Object.extend("kongcv_service_file");
var kongcv_log_location_search_cls = AV.Object.extend("kongcv_log_location_search");
var kongcv_property_cls = AV.Object.extend("kongcv_property");
var kongcv_invite_code_cls = AV.Object.extend("kongcv_invite_code");
var kongcv_property_cls = AV.Object.extend("kongcv_property");
var kongcv_android_version_cls = AV.Object.extend("kongcv_android_version");
var kongcv_park_autopush_cls = AV.Object.extend("kongcv_park_autopush");
var kongcv_coupon_cls = AV.Object.extend("kongcv_coupon");
var kongcv_share_coupon_cls = AV.Object.extend("kongcv_share_coupon");
var kongcv_exception_cls = AV.Object.extend("kongcv_exception");
var kongcv_market_coupon_cls = AV.Object.extend("kongcv_market_coupon");
var kongcv_user_coupon_cls = AV.Object.extend("kongcv_user_coupon");
var kongcv_park_share_cls = AV.Object.extend("kongcv_park_share");
var kongcv_rate = 1;
var limit_minseconds = 10 * 60 * 1000;
var loop_num = 2;
var limit_records = 20;
var limit_price = 10;
var limit_balance_price = 0.1;

var user_0 = "kongcv_admin";
var user_0_ps = "kongcv!23";

/**
 * brief   : get smscode
 * @param  : request - {"mobilePhoneNumber":"13xxxxxx"}
 *           response - RET_OK or ERROR
 *           {"result":"{\"state\":\"ok\",\"code\":1,\"msg\":\"成功\"}
 * @return : RET_OK - success
 *           ERROR - system error
 *           {"code":601,"error":"xxxxxx"}
 */
AV.Cloud.define("kongcv_get_smscode", function(request, response) {
    var mobilePhoneNumber = request.params.mobilePhoneNumber; 
    if (typeof(mobilePhoneNumber) == "undefined" || mobilePhoneNumber.length === 0) {
        console.log("kongcv_get_smscode:",ERROR_MSG.ERR_USER_MOBILE_MUST_EXIST);
        response.success(ERROR_MSG.ERR_USER_MOBILE_MUST_EXIST);
        return;
    }

    AV.Cloud.requestSmsCode(mobilePhoneNumber).then(
        function(result) {
            response.success(RESULT_MSG.RET_OK);
            return;
        },
        function(error) {
            console.log("kongcv_get_smscode:",error);
            response.error(error);
            return;
        }
    );
});

/**
 * brief   : mobile verify mobile
 * @param  : request - {"smsCode":"xxxx"}
 *           response - RET_OK or ERROR
 *           {"result":"{\"state\":\"ok\",\"code\":1,\"msg\":\"成功\"}
 * @return : RET_OK - success
 *           ERROR - system error
 *           {"code":601,"error":"xxxxxx"}
 */
AV.Cloud.define("kongcv_verify_mobile", function(request, response) { 
    var smsCode = request.params.smsCode;
    if (typeof(smsCode) == "undefined" || smsCode.length === 0) {
        console.log("kongcv_verify_mobile:",ERROR_MSG.ERR_SMSCODE_MUST_EXIST);
        response.success(ERROR_MSG.ERR_SMSCODE_MUST_EXIST);
        return;
    }
    
    AV.User.verifyMobilePhone(smsCode).then(
        function(obj) {
            response.success(RESULT_MSG.RET_OK);
            return;
        },
        function(error) {
            console.log("kongcv_verify_mobile:",error);
            response.error(error);
            return;
        }
    );
});

/**
 * brief   : mobile verify smscode
 * @param  : request - {"mobilePhoneNumber":"13xxxxxx", "smsCode":"xxxx"}
 *           response - RET_OK or ERROR
 *           {"result":"{\"state\":\"ok\",\"code\":1,\"msg\":\"成功\"}
 * @return : RET_OK - success
 *           ERROR - system error
 *           {"code":601,"error":"xxxxxx"}
 */
AV.Cloud.define("kongcv_verify_smscode", function(request, response) {
    var mobilePhoneNumber = request.params.mobilePhoneNumber; 
    if (typeof(mobilePhoneNumber) == "undefined" || mobilePhoneNumber.length === 0) {
        console.log("kongcv_verify_smscode:",ERROR_MSG.ERR_USER_MOBILE_MUST_EXIST);
        response.success(ERROR_MSG.ERR_USER_MOBILE_MUST_EXIST);
        return;
    }
    
    var smsCode = request.params.smsCode;
    if (typeof(smsCode) == "undefined" || smsCode.length === 0) {
        console.log("kongcv_verify_smscode:",ERROR_MSG.ERR_SMSCODE_MUST_EXIST);
        response.success(ERROR_MSG.ERR_SMSCODE_MUST_EXIST);
        return;
    }
    
    AV.Cloud.verifySmsCode(smsCode, mobilePhoneNumber).then(
        function(obj) {
            response.success(RESULT_MSG.RET_OK);
            return;
        },
        function(error) {
            console.log("kongcv_verify_smscode:",error);
            response.error(error);
            return;
        }
    );
});

/**
 * brief   : get userinfo
 * @param  : request - {"mobilePhoneNumber":"13xxxxxx", "user_id":"xxxxxx"}
 *           response - RET_OK or ERROR
 *           {user json}
 * @return : RET_OK - success
 *           ERROR - system error
 *           {"code":601,"error":"xxxxxx"}
 */
AV.Cloud.define("kongcv_get_userinfo", function(request, response) { 
    var user_id = request.params.user_id;
    if (typeof(user_id) == "undefined" || user_id.length === 0) {
        console.log("kongcv_get_userinfo:",ERROR_MSG.ERR_USERID_MUST_HAVE);
        response.success(ERROR_MSG.ERR_USERID_MUST_HAVE);
        return;
    }
    
    var user_obj = request.user; 
    if (typeof(user_obj) == "undefined" || user_obj.length === 0) {
        console.log("kongcv_get_userinfo:",ERROR_MSG.ERR_USER_SESSIONTOKEN_MUST_EXIST);
        response.success(ERROR_MSG.ERR_USER_SESSIONTOKEN_MUST_EXIST);
        return;
    }
    
    if (user_id != user_obj.id) {
        console.log("kongcv_get_userinfo:",ERROR_MSG.ERR_USERID_SESSIONTOKEN_UNMATCHED);
        response.success(ERROR_MSG.ERR_USERID_SESSIONTOKEN_UNMATCHED);
        return;
    }
    
    response.success(user_obj);
    return;
});
 
/**
 * brief   : put userinfo(mobile)
 * @param  : request - {"mobilePhoneNumber":"13xxxxxx","user_name":"zhouhaoxuan", "device_token":"111111", "device_type":"ios","city":"xxxx","license_plate":"xxxx","version":"xxxx","city":"xxxx"}
 *           response - RET_OK or ERROR
 *           {"result":"{\"state\":\"ok\",\"code\":1,\"msg\":\"成功\"}
 * @return : RET_OK - success
 *           ERROR - system error
 *           {"code":601,"error":"xxxxxx"}
 */
var _check_mobile = function(str) {
    var partten = /^1[3,5,8]\d{9}$/;
    if (partten.test(str)) {
        return true;
    }
    
    return false;
};

AV.Cloud.define("kongcv_put_userinfo", function(request, response) { 
    var user = request.user; 
    if (typeof(user) == "undefined" || user.length === 0) {
        console.log("kongcv_put_userinfo:",ERROR_MSG.ERR_USER_SESSIONTOKEN_MUST_EXIST);
        response.success(ERROR_MSG.ERR_USER_SESSIONTOKEN_MUST_EXIST);
        return;
    }
    
    var mobilePhoneNumber = request.params.mobilePhoneNumber; 
    var user_name = request.params.user_name; 
    var device_token = request.params.device_token; 
    var device_type = request.params.device_type; 
    var license_plate = request.params.license_plate; 
    var version = request.params.version; 
    var city = request.params.city; 

    if (typeof(mobilePhoneNumber) != "undefined") {
        if (mobilePhoneNumber.length > 0) {
            user.set("mobilePhoneNumber", mobilePhoneNumber);
            var user_name = user.get("username");
            if (user_name != mobilePhoneNumber) {
                if (_check_mobile(user_name)) {
                    user.set("username", mobilePhoneNumber);
                }
            }
        }
    }
    
    if (typeof(device_token) != "undefined") {
        if (device_token.length > 0) {
            user.set("device_token", device_token);
        }
    }

    if (typeof(device_type) != "undefined") {
        if (device_type.length > 0) {
            user.set("device_type", device_type);
        }
    }
 
    if (typeof(user_name) != "undefined") {
        if (user_name.length > 0) {
            user.set("username", user_name);
        }
    }

    if (typeof(license_plate) != "undefined") {
        if (license_plate.length > 0) {
            user.set("license_plate", license_plate);
        }
    }

    if (typeof(version) != "undefined") {
        if (version.length > 0) {
            user.set("version", version);
        }
    }
    
    if (typeof(city) != "undefined") {
        if (city.length > 0) {
            user.set("city", city);
        }
    }

    user.save().then(
        function(user_obj) {
            response.success(RESULT_MSG.RET_OK);
            return;
        },
        function(error) {
            console.log("kongcv_put_userinfo:",error);
            response.error(error);
            return;
        }     
    ); 
});

/**
 * brief   : user sign up
 * @param  : request - {"mobilePhoneNumber":"13xxxxxx", "smsCode":"yyyyy", "role":"park_manager", "mode":"debug"}
 *           response - RET_OK or RET_ERROR
 * @return : RET_OK - success, sessionToken - must storge
 *           {"result":"{\"state\":\"ok\",\"code\":1,\"msg\":\"成功\",\"sessionToken\":\"xxxxxxxx\"}"}
 *           RET_ERROR - system error
 *           {"code":601,"error":"xxxxxx"}
 */
AV.Cloud.define("kongcv_signup", function(request, response) {
    var request_json = request.params;

    var mobilePhoneNumber = request.params.mobilePhoneNumber;
    if (typeof(mobilePhoneNumber) == "undefined" || mobilePhoneNumber.length === 0) {
        console.log("kongcv_signup:",ERROR_MSG.ERR_USER_MOBILE_MUST_EXIST);
        response.success(ERROR_MSG.ERR_USER_MOBILE_MUST_EXIST);
        return;
    }

    var smsCode = request.params.smsCode;
    if (typeof(smsCode) == "undefined" || smsCode.length === 0) {
        console.log("kongcv_signup:",ERROR_MSG.ERR_SMSCODE_MUST_EXIST);
        response.success(ERROR_MSG.ERR_SMSCODE_MUST_EXIST);
        return;
    }

    var mode = request.params.mode;

    var role = request.params.role;
    var role_id;
    if (typeof(role) != "undefined" && role.length > 0) {
        if (typeof(mode) != "undefined" && mode.length > 0) {
            if ("debug" === mode) {
                if ("park_manager" === role) {
                    role_id = debug_park_manager_role_id;
                }
                else if ("worker" === role) {
                    role_id = debug_worker_role_id;
                }
            }
            else if ("release" === mode) {
                if ("park_manager" === role) {
                    role_id = release_park_manager_role_id;
                }
                else if ("worker" === role) {
                    role_id = release_worker_role_id;
                }
            }

            delete request_json["role"];
            delete request_json["mode"];
            JSON.stringify(request_json);
        }
    }

    if ((mobilePhoneNumber === "18514767527" || mobilePhoneNumber === "18333693804"|| mobilePhoneNumber === "13717950391") && smsCode === "123456") {
        AV.User.logIn(mobilePhoneNumber, smsCode, {
            success :function(user) { 
                var json_obj = eval("("+RESULT_MSG.RET_OK+")");
                json_obj["sessionToken"] = user._sessionToken;
                json_obj["user_id"] = user.id;
                if (undefined != user._serverData.image) {
                    json_obj["image_url"] = user._serverData.image._url;
                }
                response.success(JSON.stringify(json_obj));
                return;
            },
            error : function(error) {
                console.log("kongcv_signup:",error);
                response.success(RESULT_MSG.RET_FAIL);
                //response.error(error);
                return;
            }
        });
    }
    else {
    var user_obj = new AV.User();
    console.log("request_json", request_json);
    user_obj.signUpOrlogInWithMobilePhone(
        request_json,
        {
            success : function(user) {
                if (typeof(role_id) != "undefined" && role_id.length > 0) {
                    user.set("role", role_id);
                    user.save().then(
                        function() {
                            console.log("role save ok");
                        },
                        function(error) {
                            console.log("role save error:", error);
                        }
                    );
                }

                var json_obj = eval("("+RESULT_MSG.RET_OK+")");
                json_obj["sessionToken"] = user._sessionToken;
                json_obj["user_id"] = user.id;
                //json_obj["device_token"] = user._serverData.device_token;
                //json_obj["device_type"] = user._serverData.device_type;
                if (undefined != user._serverData.image) {
                    json_obj["image_url"] = user._serverData.image._url;
                }
                response.success(JSON.stringify(json_obj));
                return;
            },
            error : function(error) {
                console.log("kongcv_signup:",error);
                response.success(RESULT_MSG.RET_FAIL);
                //response.error(error);
                return;
            }
        }
    );
    }
});

/**
* brief   : upload image
* @param  : request -{"user_id" : "555c28b8e4b0b7e69366b482","file_name":"xxxxx", "file_base64":"xxxxx","image_id":"sssss"}
*           reponse - define error, result or system error
*           {"result":"{"state":"error", "code":20, "msg":"belong type必填}"}
* @return : success - RET_OK
*           error - define error or system error
*/
AV.Cloud.define('kongcv_upload_image', function(request, response) {
    var user_id = request.params.user_id;
    if (typeof(user_id) == "undefined" || user_id.length === 0) {
        console.log("kongcv_upload_image:",ERROR_MSG.ERR_USERID_MUST_HAVE);
        response.success(ERROR_MSG.ERR_USERID_MUST_HAVE);
        return;
    }
    
    var user_obj = request.user; 
    if (typeof(user_obj) == "undefined" || user_obj.length === 0) {
        console.log("kongcv_upload_image:",ERROR_MSG.ERR_USER_SESSIONTOKEN_MUST_EXIST);
        response.success(ERROR_MSG.ERR_USER_SESSIONTOKEN_MUST_EXIST);
        return;
    }
    
    if (user_id != user_obj.id) {
        console.log("kongcv_upload_image:",ERROR_MSG.ERR_USERID_SESSIONTOKEN_UNMATCHED);
        response.success(ERROR_MSG.ERR_USERID_SESSIONTOKEN_UNMATCHED);
        return;
    }

    var file_name = request.params.file_name;
    if (typeof(file_name) == "undefined" || file_name.length === 0) {
        console.log("kongcv_upload_image:",ERROR_MSG.ERR_FILE_NAME_MUST_HAVE);
        response.success(ERROR_MSG.ERR_FILE_NAME_MUST_HAVE);
        return;
    }

    var file_base64 = request.params.file_base64;
    if (typeof(file_base64) == "undefined" || file_base64.length === 0) {
        console.log("kongcv_upload_image:",ERROR_MSG.ERR_FILE_DATA_MUST_HAVE);
        response.success(ERROR_MSG.ERR_FILE_DATA_MUST_HAVE);
        return;
    }

    var image_id = request.params.image_id;

    var file_obj = new AV.File(file_name, { base64: file_base64 });
    file_obj.metaData().mimeType = "image/jpeg";
    file_obj.save().then(
        function(file_obj) { 
            user_obj.set("image", file_obj);
            user_obj.save().then(
                function() {
                    if (typeof(image_id) != "undefined" || image_id.length != 0) {
                        AV.User.logIn(user_0, user_0_ps, {
                            success :function(user_admin) { 
                                var image_file_query = new AV.Query(image_file_cls);
                                image_file_query.get(image_id, {
                                    success : function(image_file_obj) {
                                        image_file_obj.destroy({
                                            success : function() {
                                            },
                                            error : function(error) {
                                                console.log("kongcv_upload_image:",error);
                                            }
                                        });
                                    },
                                    error : function(error) {
                                        console.log("kongcv_upload_image:",error);
                                    }
                                });
                            },
                            error : function(error) {
                                console.log("kongcv_upload_image:",error);
                                response.error(error);
                                return;
                            }
                        });
                    }
                    
                    var json_obj = eval("("+RESULT_MSG.RET_OK+")");
                    json_obj["image"] = file_obj;
                    response.success(JSON.stringify(json_obj));
                    return;
                },
                function(error) {
                    console.log("kongcv_upload_image:",error);
                    response.error(error);
                    return;
                }
            );
        },
        function(file_obj, error) {
            console.log("kongcv_upload_image:",error);
            response.error(error);
            return;
        }
    );
});

/**
* brief   : insert user coupon
* @param  : request -{"user_id" : "555c28b8e4b0b7e69366b482", "coupon_id":"xxxxx"}
*           reponse - define error, result or system error
*           {"result":"{"state":"error", "code":20, "msg":"belong type必填}"}
* @return : success - RET_OK
*           error - define error or system error
*/
var _kongcv_insert_user_coupon = function(response, user_obj, coupon_obj, use_resp) {
    if (typeof(user_obj) == "undefined" || user_obj.length === 0) {
        console.log("_kongcv_insert_user_coupon", ERROR_MSG.ERR_USERID_MUST_HAVE);
        return; 
    }
    
    if (typeof(coupon_obj) == "undefined" || coupon_obj.length === 0) {
        console.log("_kongcv_insert_user_coupon:",ERROR_MSG.ERR_COUPON_ID_MUST_HAVE);
        return; 
    }

    var days = coupon_obj.get("use_days");
    var now_date = new Date();
    var end_date = new Date(now_date.setDate(now_date.getDate() + days));

    var kongcv_user_coupon_obj = new kongcv_user_coupon_cls();
    kongcv_user_coupon_obj.set("coupon", coupon_obj);
    kongcv_user_coupon_obj.set("user", user_obj);
    kongcv_user_coupon_obj.set("end_date", end_date);
    
    kongcv_user_coupon_obj.save().then(
        function(obj) {
            if (1 === use_resp) {
                response.success(RESULT_MSG.RET_OK);
                return;
            }
        },
        function(error) {
            console.log("_kongcv_insert_user_coupon error:", error);
        }
    );
};

AV.Cloud.define('kongcv_insert_user_coupon', function(request, response) {
    var user_id = request.params.user_id;
    if (typeof(user_id) == "undefined" || user_id.length === 0) {
        console.log("kongcv_insert_user_coupon:",ERROR_MSG.ERR_USERID_MUST_HAVE);
        response.success(ERROR_MSG.ERR_USERID_MUST_HAVE);
        return;
    }

    var coupon_id = request.params.coupon_id;
    if (typeof(coupon_id) == "undefined" || coupon_id.length === 0) {
        console.log("kongcv_insert_user_coupon:",ERROR_MSG.ERR_COUPON_ID_MUST_HAVE);
        response.success(ERROR_MSG.ERROR_MSG.ERR_COUPON_ID_MUST_HAVE);
        return; 
    }
    
    var user_obj = new user_cls();
    user_obj.id = user_id; 
    
    var coupon_query = new AV.Query(kongcv_coupon_cls);
    coupon_query.get(coupon_id, {
        success : function(coupon_obj) {
            _kongcv_insert_user_coupon(response, user_obj, coupon_obj, 1);
        },
        error : function(error) {
            console.log("kongcv_insert_user_coupon error:", error);
            response.error(error);
            return;
        }
    }); 
});

/**
* brief   : remove coupon
* @param  : request -{"user_id" : "555c28b8e4b0b7e69366b482", "coupon_id":"xxxxx", "use_token":1}
*           reponse - define error, result or system error
*           {"result":"{"state":"error", "code":20, "msg":"belong type必填}"}
* @return : success - RET_OK
*           error - define error or system error
*/
/*AV.Cloud.define('kongcv_remove_coupon', function(request, response) {
    var user_id = request.params.user_id;
    if (typeof(user_id) == "undefined" || user_id.length === 0) {
        console.log("kongcv_remove_coupon:",ERROR_MSG.ERR_USERID_MUST_HAVE);
        response.success(ERROR_MSG.ERR_USERID_MUST_HAVE);
        return;
    }
    
    var coupon_id = request.params.coupon_id;
    if (typeof(coupon_id) == "undefined" || coupon_id.length === 0) {
        console.log("kongcv_remove_coupon:",ERROR_MSG.ERR_COUPON_ID_MUST_HAVE);
        response.success(ERROR_MSG.ERR_COUPON_ID_MUST_HAVE);
        return; 
    }
    
    var user_obj;
    var use_token = request.params.use_token;
    if (typeof(use_token) != "undefined" && 1 === use_token) {
        user_obj = request.user; 
        if (typeof(user_obj) == "undefined" || user_obj.length === 0) {
            console.log("kongcv_remove_coupon:",ERROR_MSG.ERR_USER_SESSIONTOKEN_MUST_EXIST);
            response.success(ERROR_MSG.ERR_USER_SESSIONTOKEN_MUST_EXIST);
            return;
        }

        if (user_id != user_obj.id) {
            console.log("kongcv_remove_coupon:",ERROR_MSG.ERR_USERID_SESSIONTOKEN_UNMATCHED);
            response.success(ERROR_MSG.ERR_USERID_SESSIONTOKEN_UNMATCHED);
            return;
        }
    }
    else { 
        user_obj = new user_cls();
        user_obj.id = user_id; 
    }

    //var coupon_obj = new kongcv_coupon_cls();
    //coupon_obj.id = coupon_id;

    //var coupon_relation = user_obj.relation("coupon");
    //coupon_relation.remove(coupon_obj);

    //user_obj.save().then(
    //    function(user) {
    //        response.success(RESULT_MSG.RET_OK);
    //    },
    //    function(error) {
    //        console.log("kongcv_remove_coupon error:", error);
    //    }
    //);
    
    var coupon_obj = new kongcv_user_coupon_cls();
    coupon_obj.id = coupon_id;
    
    coupon_obj.destroy().then(
        function(obj) {
            response.success(RESULT_MSG.RET_OK);
            return;
        },
        function(error) {
            console.log("kongcv_remove_coupon error:", error);
            response.error(error);
            return;
        }
    );
});*/

/**
* brief   : get user coupon list
* @param  : request -{"user_id" : "555c28b8e4b0b7e69366b482","use_token":1}
*           reponse - define error, result or system error
*           {"result":"{"state":"error", "code":20, "msg":"belong type必填}"}
* @return : success - RET_OK
*           error - define error or system error
*/
AV.Cloud.define('kongcv_get_user_coupon_list', function(request, response) {
    var user_id = request.params.user_id;
    if (typeof(user_id) == "undefined" || user_id.length === 0) {
        console.log("kongcv_get_user_coupon_list:",ERROR_MSG.ERR_USERID_MUST_HAVE);
        response.success(ERROR_MSG.ERR_USERID_MUST_HAVE);
        return;
    }
    
    var user_obj;
    var use_token = request.params.use_token;
    if (typeof(use_token) != "undefined" && 1 === use_token) {
        user_obj = request.user; 
        if (typeof(user_obj) == "undefined" || user_obj.length === 0) {
            console.log("kongcv_get_user_coupon_list:",ERROR_MSG.ERR_USER_SESSIONTOKEN_MUST_EXIST);
            response.success(ERROR_MSG.ERR_USER_SESSIONTOKEN_MUST_EXIST);
            return;
        }

        if (user_id != user_obj.id) {
            console.log("kongcv_get_user_coupon_list:",ERROR_MSG.ERR_USERID_SESSIONTOKEN_UNMATCHED);
            response.success(ERROR_MSG.ERR_USERID_SESSIONTOKEN_UNMATCHED);
            return;
        }
    }
    else { 
        user_obj = new user_cls();
        user_obj.id = user_id; 
    }

    var user_coupon_query = new AV.Query(kongcv_user_coupon_cls);
    user_coupon_query.equalTo("user", user_obj);
    user_coupon_query.include("coupon");
    user_coupon_query.limit(10);
    user_coupon_query.find({
        success : function(results) {
            for (i = 0; i < results.length; i++) {
                results[i].set("coupon", JSON.stringify(results[i].get("coupon")));
                results[i].set("now_date", new Date());
            }
            
            response.success(results);
            return;
        },
        error : function(error) {
            console.log("kongcv_get_user_coupon_list:",error);
            response.error(error);
            return;
        }
    });
});
 
/**
 * brief   : get share coupon
 * @param  : request - {}
 *           response - return advertise recordset or error
 * @return : RET_OK - success
 *           {recordset json array}
 *           RET_ERROR - system error
 *           {"code":601,"error":"xxxxxx"}
 */
AV.Cloud.define("kongcv_get_share_coupon", function(request, response) {
    var query = new AV.Query(kongcv_share_coupon_cls);
    
    query.find({
        success : function(results) {
            response.success(results);
            return;
        },
        error : function(error) {
            console.log("kongcv_share_coupon:",error);
            response.error(error);
            return;
        }
    });
});

/**
* brief   : push sms info
* @param  : request -{"mobilePhoneNumber" : "xxxx","push_type":"verify_request"}
*           reponse - define error, result or system error
*           {"result":"{"state":"error", "code":20, "msg":"xxxx"}"}
* @return : success - RET_OK
*           error - define error or system error
*/
var _kongcv_sms_push = function(mobilePhoneNumber, push_type, pay_price, park_address, mode_string) {
    if (typeof(mobilePhoneNumber) == "undefined" || mobilePhoneNumber.length === 0) {
        console.log("_kongcv_sms_push:",ERROR_MSG.ERR_USER_MOBILE_MUST_EXIST);
        //response.success(ERROR_MSG.ERR_USER_MOBILE_MUST_EXIST);
        return;
    }

    if (typeof(push_type) == "undefined" || push_type.length === 0) {
        console.log("_kongcv_sms_push:",ERROR_MSG.ERR_PUSH_TYPE_MUST_EXIST);
        //response.success(ERROR_MSG.ERR_PUSH_TYPE_MUST_EXIST);
        return;
    }

    AV.Cloud.requestSmsCode({
        mobilePhoneNumber:mobilePhoneNumber,
        template:push_type,
        price:pay_price,
        address:park_address,
        mode:mode_string
    }).then(
        function() {
            //response.success(RESULT_MSG.RET_OK);
            return;
        },
        function(error) {
            console.log("_kongcv_sms_push:",error);
            //response.error(error);
            return;
        }
    );
};

var _kongcv_sms_send = function(request, response) {
    var mobilePhoneNumber = request.params.mobilePhoneNumber;
    if (typeof(mobilePhoneNumber) == "undefined" || mobilePhoneNumber.length === 0) {
        console.log("_kongcv_sms_send:",ERROR_MSG.ERR_USER_MOBILE_MUST_EXIST);
        response.success(ERROR_MSG.ERR_USER_MOBILE_MUST_EXIST);
        return;
    }

    var push_type = request.params.push_type;
    if (typeof(push_type) == "undefined" || push_type.length === 0) {
        console.log("_kongcv_sms_send:",ERROR_MSG.ERR_PUSH_TYPE_MUST_EXIST);
        response.success(ERROR_MSG.ERR_PUSH_TYPE_MUST_EXIST);
        return;
    }

    //v1.0.3 add, no decide
    var own_license_plate = request.params.extras.own_license_plate;
    var proxy_mobile = request.params.extras.proxy_mobile;
    if (typeof(proxy_mobile) != "undefined" && proxy_mobile.length != 0) {
        mobilePhoneNumber = proxy_mobile;
    }
    
    AV.Cloud.requestSmsCode({
        mobilePhoneNumber:mobilePhoneNumber,
        template:push_type,
        limit_time:10,
        license_plate:own_license_plate
    }).then(
        function() {
            //response.success(RESULT_MSG.RET_OK);
            return;
        },
        function(error) {
            console.log("_kongcv_sms_send:",error);
            //response.error(error);
            return;
        }
    );
};

AV.Cloud.define("kongcv_push_smsinfo", function(request, response) {
   return _kongcv_sms_send(request, response);
});
 
/**
 * brief   : jpush push messge, point to point
 * @param  : request - {"mobilePhoneNumber":"1xxxxxxx", "push_type":"verify_accept", "device_token":"021a12c5dc4", "device_type":"ios", "user_id":"xxxx",extras:{"park_id":"xxxxx","mode":"community","address":"xxxxx","hire_method_id":"xxxxx","hire_method_field":"hore_meter","hire_start":"2015-10-17 08:00:00", "hire_end":"2015-10-17 18:00:00","own_device_token":"xxxxx","own_device_type":"android","own_mobile":"1xxxxx","own_license_plate":"xxxx","proxy_mobile":xxxx", "push_type":"verify_accept","trade_id":"xxx","pay_type":"xxx","pay_tool":"alipay","price":0},"use_token":1}
 *           response - return map recordset or error
 * @return : RET_OK - success
 *           {recordset json array}
 *           RET_ERROR - system error
 *           {"code":601,"error":"xxxxxx"}
 */
var _jpush_push_message = function(request, response, push_info, extras) {
    var push_type = request.params.push_type;
    var device_token = request.params.device_token;
    var device_type = request.params.device_type;
    var device_notify;
    var mode;
    if ("verify_reject" != push_type && typeof(extras) != "undefined" && extras.length > 0) {
        mode = request.params.extras.mode;
    }
    
    if ("ios" === device_type) {
        device_notify = JPush.ios(push_info, 'happy', 1, true, extras);
    }
    else if ("android" === device_type) {
        device_notify = JPush.android(push_info, null, 1, extras);
    }
    else if ("web" === device_type) {
        response.success(RESULT_MSG.RET_OK);
    }
    else {
        response.success(ERROR_MSG.ERR_INFO_FORMAT);
        return;
    }
 
    JPush_client.push().setPlatform(device_type)
    .setAudience(JPush.registration_id(device_token))
    .setNotification('Hi, Kongcv', device_notify)
    .setOptions(868686, 864000, null, JPush_production)
    .send(function(err, res) {
        if (err) {
            if (err instanceof JPush.APIConnectionError) {
                console.log("_jpush_push_message:",err);
                response.error(err);
                return;
            } 
            else if (err instanceof  JPush.APIRequestError) {
                console.log("_jpush_push_message:",err);
                response.error(err);
                return;
            }
        } 
        else {
            if ("trade_charge" != push_type) {
                /*if (typeof(mode) != "undefined" && mode.length > 0) {
                    if ("verify_request" === push_type && "curb" === mode) {
                        return;
                    }
                }*/

                _kongcv_sms_send(request, response);
                //response.success(RESULT_MSG.RET_OK);
            }
        }
    });
        
    response.success(RESULT_MSG.RET_OK);
    return;
};

AV.Cloud.define("kongcv_jpush_message_p2p", function(request, response) { 
    console.log("invoke jpush message p2p");
    var req_mobile = request.params.mobilePhoneNumber;
    if (typeof(req_mobile) == "undefined" || req_mobile.length === 0) {
        console.log("kongcv_jpush_message_p2p:",ERROR_MSG.ERR_USER_MOBILE_MUST_EXIST);
        response.success(ERROR_MSG.ERR_USER_MOBILE_MUST_EXIST);
        return;
    }

    var push_type = request.params.push_type;
    if (typeof(push_type) == "undefined" || push_type.length === 0) {
        console.log("kongcv_jpush_message_p2p:",ERROR_MSG.ERR_PUSH_TYPE_MUST_EXIST);
        response.success(ERROR_MSG.ERR_PUSH_TYPE_MUST_EXIST);
        return;
    }

    var device_token = request.params.device_token;
    if (typeof(device_token) == "undefined" || device_token.length === 0) {
        console.log("kongcv_jpush_message_p2p:",ERROR_MSG.ERR_DEVICE_TOKEN_MUST_EXIST);
        response.success(ERROR_MSG.ERR_DEVICE_TOKEN_MUST_EXIST);
        return;
    }

    var device_type = request.params.device_type;
    if (typeof(device_type) == "undefined" || device_type.length === 0) {
        console.log("kongcv_jpush_message_p2p:",ERROR_MSG.ERR_DEVICE_TYPE_MUST_EXIST);
        response.success(ERROR_MSG.ERR_DEVICE_TYPE_MUST_EXIST);
        return;
    }

    var user_id = request.params.user_id;
    if (typeof(user_id) == "undefined" || user_id.length === 0) {
        console.log("kongcv_jpush_message_p2p:",ERROR_MSG.ERR_USER_ID_MUST_EXIST);
        response.success(ERROR_MSG.ERR_USER_ID_MUST_EXIST);
        return;
    }
    
    var user_obj;
    var use_token = request.params.use_token;
    if (typeof(use_token) != "undefined" && 1 === use_token) {
        user_obj = request.user; 
        if (typeof(user_obj) == "undefined" || user_obj.length === 0) {
            console.log("kongcv_jpush_message_p2p:",ERROR_MSG.ERR_USER_SESSIONTOKEN_MUST_EXIST);
            response.success(ERROR_MSG.ERR_USER_SESSIONTOKEN_MUST_EXIST);
            return;
        }

        if (user_id != user_obj.id) {
            console.log("kongcv_jpush_message_p2p:",ERROR_MSG.ERR_USERID_SESSIONTOKEN_UNMATCHED);
            response.success(ERROR_MSG.ERR_USERID_SESSIONTOKEN_UNMATCHED);
            return;
        }
    }
    else { 
        user_obj = new user_cls();
        user_obj.id = user_id; 
    }

    var push_info;
    var has_extras = 0;
    if ("verify_accept" === push_type) {
        push_info = PUSH_INFO.VERIFY_ACCEPT;
        has_extras = 1;
    }
    else if ("verify_reject" === push_type) {
        push_info = PUSH_INFO.VERIFY_REJECT;
    }
    else if ("verify_request" === push_type) {
        push_info = PUSH_INFO.VERIFY_REQUEST;
        has_extras = 1;
    }
    else if ("trade_charge" === push_type) {
        push_info = PUSH_INFO.TRADE_CHARGE;
        has_extras = 1;
    }
    else {
        console.log("kongcv_jpush_message_p2p:",ERROR_MSG.ERR_INFO_FORMAT);
        response.success(ERROR_MSG.ERR_INFO_FORMAT);
        return;
    }
    
    var extras = request.params.extras;
    if (typeof(extras) == "undefined" || extras.length === 0) {
        console.log("kongcv_jpush_message_p2p:",ERROR_MSG.ERR_JPUSH_EXTRAS_MUST_EXIST);
        response.success(ERROR_MSG.ERR_JPUSH_EXTRAS_MUST_EXIST);
        return;
    }

    var extras_mode;;
    if (1 === has_extras) { 
        extras_mode = extras.mode;
        if (typeof(extras_mode) == "undefined" || extras_mode.length === 0) {
            console.log("kongcv_jpush_message_p2p:",ERROR_MSG.ERR_MODE_MUST_EXIST);
            response.success(ERROR_MSG.ERR_MODE_MUST_EXIST);
            return;
        }
       
        var extras_address = extras.address;
        if (typeof(extras_address) == "undefined" || extras_address.length === 0) {
            console.log("kongcv_jpush_message_p2p:",ERROR_MSG.ERR_ADDRESS_MUST_EXIST);
            response.success(ERROR_MSG.ERR_ADDRESS_MUST_EXIST);
            return;
        }
 
        var extras_park_id = extras.park_id;
        if (typeof(extras_park_id) == "undefined" || extras_park_id.length === 0) {
            console.log("kongcv_jpush_message_p2p:",ERROR_MSG.ERR_PARK_ID_MUST_EXIST);
            response.success(ERROR_MSG.ERR_PARK_ID_MUST_EXIST);
            return;
        }

        var extras_hire_method_id = extras.hire_method_id;
        if (typeof(extras_hire_method_id) == "undefined" || extras_hire_method_id.length === 0) {
            console.log("kongcv_jpush_message_p2p:",ERROR_MSG.ERR_HIRE_METHOD_MUST_EXIST);
            response.success(ERROR_MSG.ERR_HIRE_METHOD_MUST_EXIST);
            return;
        }
        
        var extras_hire_method_field = extras.hire_method_field;
        if (typeof(extras_hire_method_field) == "undefined" || extras_hire_method_field.length === 0) {
            console.log("kongcv_jpush_message_p2p:",ERROR_MSG.ERR_HIRE_METHOD_MUST_EXIST);
            response.success(ERROR_MSG.ERR_HIRE_METHOD_MUST_EXIST);
            return;
        }

        if ("hour_meter" != extras_hire_method_field) {
            var extras_hire_start = extras.hire_start;
            if (typeof(extras_hire_start) == "undefined" || extras_hire_start.length === 0) {
                console.log("kongcv_jpush_message_p2p:",ERROR_MSG.ERR_HIRE_START_MUST_EXIST);
                response.success(ERROR_MSG.ERR_HIRE_START_MUST_EXIST);
                return;
            }
            
            var extras_hire_end = extras.hire_end;
            if (typeof(extras_hire_end) == "undefined" || extras_hire_end.length === 0) {
                console.log("kongcv_jpush_message_p2p:",ERROR_MSG.ERR_HIRE_END_MUST_EXIST);
                response.success(ERROR_MSG.ERR_HIRE_END_MUST_EXIST);
                return;
            }
        }

        var extras_push_type = extras.push_type;
        if (typeof(extras_push_type) == "undefined" || extras_push_type.length === 0 || extras_push_type != push_type) {
            console.log("kongcv_jpush_message_p2p:",ERROR_MSG.ERR_PUSH_TYPE_MUST_EXIST);
            response.success(ERROR_MSG.ERR_PUSH_TYPE_MUST_EXIST);
            return;
        }
 
        if ("verify_request" === push_type) {
            var extras_device_token = extras.own_device_token;
            if (typeof(extras_device_token) == "undefined" || extras_device_token.length === 0) {
                console.log("kongcv_jpush_message_p2p:",ERROR_MSG.ERR_DEVICE_TOKEN_MUST_EXIST);
                response.success(ERROR_MSG.ERR_DEVICE_TOKEN_MUST_EXIST);
                return;
            }

            var extras_device_type = extras.own_device_type;
            if (typeof(extras_device_type) == "undefined" || extras_device_type.length === 0) {
                console.log("kongcv_jpush_message_p2p:",ERROR_MSG.ERR_DEVICE_TYPE_MUST_EXIST);
                response.success(ERROR_MSG.ERR_DEVICE_TYPE_MUST_EXIST);
                return;
            }
            
            var extras_own_mobile = extras.own_mobile;
            if (typeof(extras_own_mobile) == "undefined" || extras_own_mobile.length === 0) {
                console.log("kongcv_jpush_message_p2p:",ERROR_MSG.ERR_USER_MOBILE_MUST_EXIST);
                response.success(ERROR_MSG.ERR_USER_MOBILE_MUST_EXIST);
                return;
            }

            if (extras_own_mobile === req_mobile) {
                console.log("kongcv_jpush_message_p2p:",ERROR_MSG.ERR_USER_NO_SAME);
                //response.success(ERROR_MSG.ERR_USER_NO_SAME);
                //return;
            }
        }
       
        var extras_price;
        if ("verify_request" === push_type || "verify_accept" === push_type || "trade_charge" === push_type) {
            var extras_price = extras.price;
            if (typeof(extras_price) == "undefined" || extras_price.length === 0) {
                console.log("kongcv_jpush_message_p2p:",ERROR_MSG.ERR_HIRE_PRICE_MUST_EXIST);
                response.success(ERROR_MSG.ERR_HIRE_PRICE_MUST_EXIST);
                return;
            }
        }

        if ("trade_charge" === push_type) {
            var price_info = extras_price + "元";
            push_info += price_info;

            var extras_trade_id = extras.trade_id;
            if (typeof(extras_trade_id) == "undefined" || extras_trade_id.length === 0) {
                console.log("kongcv_jpush_message_p2p:",ERROR_MSG.ERR_TRADE_ID_MUST_EXIST);
                response.success(ERROR_MSG.ERR_TRADE_ID_MUST_EXIST);
                return;
            }
            
            var extras_pay_type = extras.pay_type;
            if (typeof(extras_pay_type) == "undefined" || extras_pay_type.length === 0) {
                console.log("kongcv_jpush_message_p2p:",ERROR_MSG.ERR_TRADE_ID_MUST_EXIST);
                response.success(ERROR_MSG.ERR_PAY_TYPE_MUST_EXIST);
                return;
            }
            
            var extras_pay_tool = extras.pay_tool;
            if (typeof(extras_pay_tool) == "undefined" || extras_pay_tool.length === 0) {
                console.log("kongcv_jpush_message_p2p:",ERROR_MSG.ERR_PAY_TOOL_MUST_EXIST);
                response.success(ERROR_MSG.ERR_PAY_TOOL_MUST_EXIST);
                return;
            }
        }
    }
    else {
        var extras_push_type = extras.push_type;
        if (typeof(extras_push_type) == "undefined" || extras_push_type.length === 0 || extras_push_type != push_type) {
            console.log("kongcv_jpush_message_p2p:",ERROR_MSG.ERR_PUSH_TYPE_MUST_EXIST);
            response.success(ERROR_MSG.ERR_PUSH_TYPE_MUST_EXIST);
            return;
        }
    }

    if ("verify_request" === push_type || "trade_charge" === push_type) { 
        var own_mobile = extras.own_mobile;

        var kongcv_push_message_obj = new kongcv_push_message_cls();
        kongcv_push_message_obj.set("req_mobile", req_mobile);
        kongcv_push_message_obj.set("own_mobile", own_mobile);
        kongcv_push_message_obj.set("push_info", push_info);
        kongcv_push_message_obj.set("push_type", push_type);
        kongcv_push_message_obj.set("extras", extras);
        kongcv_push_message_obj.set("user", user_obj);
        kongcv_push_message_obj.set("mode", extras_mode);

        kongcv_push_message_obj.save().then(
            function(message_obj) { 
                var json_obj = eval(extras);
                json_obj["message_id"] = message_obj.id;
                var new_extras = json_obj;
                
                _jpush_push_message(request, response, push_info, new_extras);
            },
            function(error) {
                console.log("kongcv_jpush_message_p2p:",error);
                response.error(error);
                return;
            }
        ); 
    }
    else {
        _jpush_push_message(request, response, push_info, extras);
    }
 });

/**
 * brief   : get hire method
 * @param  : request - {"park_type_id":"xxxx"}
 *           response - return hire method recordset or error
 * @return : RET_OK - success
 *           {recordset json array}
 *           RET_ERROR - system error
 *           {"code":601,"error":"xxxxxx"}
 */
AV.Cloud.define("kongcv_get_hire_method", function(request, response) {
    var park_type_id = request.params.park_type_id;
    if (typeof(park_type_id) == "undefined" || park_type_id.length === 0) {
        console.log("kongcv_get_hire_method:",ERROR_MSG.ERR_PARK_TYPE_MUST_EXIST);
        response.success(ERROR_MSG.ERR_PARK_TYPE_MUST_EXIST);
        return;
    }

    var query = new AV.Query(kongcv_hire_method_cls);
    query.equalTo("park_type", park_type_id);
    query.equalTo("hide",0);
    query.descending("updatedAt");
    
    query.find({
        success : function(results) {
            response.success(results);
            return;
        },
        error : function(error) {
            console.log("kongcv_get_hire_method:",error);
            response.error(error);
            return;
        }
    });
});

/**
 * brief   : get service file
 * @param  : request - {}
 *           response - return service file recordset or error
 * @return : RET_OK - success
 *           {recordset json array}
 *           RET_ERROR - system error
 *           {"code":601,"error":"xxxxxx"}
 */
AV.Cloud.define("kongcv_get_service_file", function(request, response) {
    var query = new AV.Query(kongcv_service_file_cls);
    
    query.find({
        success : function(results) {
            response.success(results);
            return;
        },
        error : function(error) {
            console.log("kongcv_get_service_file:",error);
            response.error(error);
            return;
        }
    });
});

/**
 * brief   : get advertise
 * @param  : request - {}
 *           response - return advertise recordset or error
 * @return : RET_OK - success
 *           {recordset json array}
 *           RET_ERROR - system error
 *           {"code":601,"error":"xxxxxx"}
 */
AV.Cloud.define("kongcv_get_advertise", function(request, response) {
    var query = new AV.Query(kongcv_advertise_cls);
    query.descending("updatedAt");
    
    query.find({
        success : function(results) {
            response.success(results);
            return;
        },
        error : function(error) {
            console.log("kongcv_get_advertise:",error);
            response.error(error);
            return;
        }
    });
});

/**
 * brief   : get android version
 * @param  : request - {"app_type":"user"}
 *           response - return advertise recordset or error
 * @return : RET_OK - success
 *           {recordset json array}
 *           RET_ERROR - system error
 *           {"code":601,"error":"xxxxxx"}
 */
AV.Cloud.define("kongcv_get_android_version", function(request, response) {
    var app_type = request.params.app_type;
    if (typeof(app_type) == "undefined" || app_type.length === 0) {
        console.log("kongcv_get_android_version:",ERROR_MSG.ERR_APP_TYPE_MUST_EXIST);
        response.success(ERROR_MSG.ERR_APP_TYPE_MUST_EXIST);
        return;
    }

    var query = new AV.Query(kongcv_android_version_cls);
    query.descending("updatedAt");
    query.equalTo("app_type", app_type);
    
    query.find({
        success : function(results) {
            response.success(results);
            return;
        },
        error : function(error) {
            console.log("kongcv_get_android_version:",error);
            response.error(error);
            return;
        }
    });
});

/**
 * brief   : get company info
 * @param  : request - {}
 *           response - return advertise recordset or error
 * @return : RET_OK - success
 *           {recordset json array}
 *           RET_ERROR - system error
 *           {"code":601,"error":"xxxxxx"}
 */
AV.Cloud.define("kongcv_get_company_info", function(request, response) {
    var query = new AV.Query(kongcv_info_cls);
    query.find({
        success : function(results) {
            response.success(results);
            return;
        },
        error : function(error) {
            console.log("kongcv_get_company_info:",error);
            response.error(error);
            return;
        }
    });
});

/**
 * brief   : get bank
 * @param  : request - {}
 *           response - return bank recordset or error
 * @return : RET_OK - success
 *           {recordset json array}
 *           RET_ERROR - system error
 *           {"code":601,"error":"xxxxxx"}
 */
AV.Cloud.define("kongcv_get_bank", function(request, response) {
    var query = new AV.Query(kongcv_bank_cls);
    query.descending("updatedAt");
    
    query.find({
        success : function(results) {
            response.success(results);
            return;
        },
        error : function(error) {
            console.log("kongcv_get_bank:",error);
            response.error(error);
            return;
        }
    });
});

/**
 * brief   : get park type
 * @param  : request - {}
 *           response - return park_type recordset or error
 * @return : RET_OK - success
 *           {recordset json array}
 *           RET_ERROR - system error
 *           {"code":601,"error":"xxxxxx"}
 */
AV.Cloud.define("kongcv_get_park_type", function(request, response) {
    var query = new AV.Query(kongcv_park_type_cls);
    query.equalTo("hide", 0);
    query.descending("updatedAt");

    query.find({
        success : function(results) {
            response.success(results);
            return;
        },
        error : function(error) {
            console.log("kongcv_get_park_type:",error);
            response.error(error);
            return;
        }
    });
});
 
/**
 * brief   : insert accept data
 * @param  : request - {"req_mobile":"xxxxxxxxxx","user_mobile":"xxxxx","park_id":"xxxxxxxxxxx","mode":"community"}
 *           response - return result or error
 * @return : RET_OK - success
 *           {"result":"{\"state\":\"ok\",\"code\":1,\"msg\":\"成功}"}
 *           RET_ERROR - system error
 *           {"code":601,"error":"xxxxxx"}
 */
AV.Cloud.define("kongcv_insert_accept", function(request, response) {
    var req_mobile = request.params.req_mobile;
    if (typeof(req_mobile) == "undefined" || req_mobile.length === 0) {
        console.log("kongcv_insert_accept:",ERROR_MSG.ERR_USER_MOBILE_MUST_EXIST);
        response.success(ERROR_MSG.ERR_USER_MOBILE_MUST_EXIST);
        return;
    }
    
    var user_mobile = request.params.user_mobile;
    if (typeof(user_mobile) == "undefined" || user_mobile.length === 0) {
        console.log("kongcv_insert_accept:",ERROR_MSG.ERR_USER_MOBILE_MUST_EXIST);
        response.success(ERROR_MSG.ERR_USER_MOBILE_MUST_EXIST);
        return;
    }
    
    var park_id = request.params.park_id;
    if (typeof(park_id) == "undefined" || park_id.length === 0) {
        console.log("kongcv_insert_accept:",ERROR_MSG.ERR_PARK_ID_MUST_EXIST);
        response.success(ERROR_MSG.ERR_PARK_ID_MUST_EXIST);
        return;
    }
 
    var mode = request.params.mode;
    if (typeof(mode) == "undefined" || mode.length === 0) {
        console.log("kongcv_insert_accept:",ERROR_MSG.ERR_MODE_MUST_EXIST);
        response.success(ERROR_MSG.ERR_MODE_MUST_EXIST);
        return;
    }

    var kongcv_accept_obj = new kongcv_accept_cls();

    kongcv_accept_obj.set("req_mobile", req_mobile);
    kongcv_accept_obj.set("user_mobile", user_mobile);

    var kongcv_park_community_obj;
    if ("community" === mode) {
        kongcv_park_community_obj = new kongcv_park_community_cls();
        kongcv_park_community_obj.id = park_id;
        kongcv_accept_obj.set("park_community", kongcv_park_community_obj);
    }
    else if ("curb" === mode) {
        var kongcv_park_curb_obj = new kongcv_park_curb_cls();
        kongcv_park_obj.id = park_id;
        kongcv_park_obj.set("park_curb", kongcv_park_curb_obj);
    }
    else {
        console.log("kongcv_insert_accept:",ERROR_MSG.ERR_INFO_FORMAT);
        response.success(ERROR_MSG.ERR_INFO_FORMAT);
        return;
    }
 
    if ("community" === mode) { 
        kongcv_accept_obj.set("park_community", kongcv_park_community_obj);
    }
    else if ("curb" === mode) {
        kongcv_accept_obj.set("park_curb", kongcv_park_curb_obj); 
    }

    kongcv_accept_obj.save().then(
        function() {
            response.success(RESULT_MSG.RET_OK);
            return;
        },
        function(error) {
            console.log("kongcv_insert_accept:",error);
            if (142 === error.code) {
                var error_message = error.message.split("Error detail :")[1];
                response.success(error_message);
            }
            else {
                response.error(error);
            }

            return;
        }
    );
});

/**
 * brief   : get accept info
 * @param  : request - {"user_mobile":"xxxxx","park_id":"xxxxxxxxxxx","mode":"community"}
 *           response - return success or error
 * @return : success
 *           {"save data"}
 *           error
 *           {"code":142,"error":"xxxxxx"}
 */
AV.Cloud.define("kongcv_get_accept", function(request, response) {
    var user_mobile = request.params.user_mobile;
    if (typeof(user_mobile) == "undefined" || user_mobile.length === 0) {
        console.log("kongcv_get_accept:",ERROR_MSG.ERR_USER_MOBILE_MUST_EXIST);
        response.success(ERROR_MSG.ERR_USER_MOBILE_MUST_EXIST);
        return;
    }
    
    var park_id = request.params.park_id;
    if (typeof(park_id) == "undefined" || park_id.length === 0) {
        console.log("kongcv_get_accept:",ERROR_MSG.ERR_PARK_ID_MUST_EXIST);
        response.success(ERROR_MSG.ERR_PARK_ID_MUST_EXIST);
        return;
    }
 
    var mode = request.params.mode;
    if (typeof(mode) == "undefined" || mode.length === 0) {
        console.log("kongcv_get_accept:",ERROR_MSG.ERR_MODE_MUST_EXIST);
        response.success(ERROR_MSG.ERR_MODE_MUST_EXIST);
        return;
    }

    var kongcv_park_community_obj;
    var kongcv_park_curb_obj;
    if ("community" === mode) {
        kongcv_park_community_obj = new kongcv_park_community_cls();
        kongcv_park_community_obj.id = park_id;
    }
    else if ("curb" === mode) {
        kongcv_park_curb_obj = new kongcv_park_curb_cls();
        kongcv_park_obj.id = park_id;
    }
    else {
        console.log("kongcv_get_accept:",ERROR_MSG.ERR_INFO_FORMAT);
        response.success(ERROR_MSG.ERR_INFO_FORMAT);
        return;
    }

    var accept_query = new AV.Query(kongcv_accept_cls);
    if ("community" === mode) {
        accept_query.equalTo("park_community", kongcv_park_community_obj);
    }
    else if ("curb" === mode) {
        var now_date = new Date();
        var now_minseconds = now_date.getTime();
        var accept_minseconds = now_minseconds - limit_minseconds;
        var accept_date = new Date(accept_minseconds);
        accept_query.equalTo("park_curb", kongcv_park_curb_obj);
        accept_query.equalTo("user_mobile", user_mobile);
        accept_query.greaterThan("updatedAt", accept_date);
    }
    accept_query.limit(1);
    accept_query.descending("createdAt");
    
    accept_query.find({
        success : function(results) {
            if (results.length > 0) {
                var kongcv_accept_obj = results[0];
                if ("community" === mode) {
                    if (user_mobile === kongcv_accept_obj.get("user_mobile")) {
                        response.success(RESULT_MSG.RET_OK);
                        return;
                    }
                    else {
                        response.success(RESULT_MSG.RET_FAIL);
                        return;
                    }
                }
                else if ("curb" === mode) {
                    response.success(RESULT_MSG.RET_OK);
                    return;
                }
            }
            else if (0 === results.length) { 
                response.success(RESULT_MSG.RET_FAIL);
                return;
            }
            return;
        },
        error : function(error) {
            console.log("kongcv_get_accept:",error);
            response.error(error);
            return;
        }
    });
});

/**
 * brief   : get accept info
 * @param  : request - {"user_mobile":"xxxxx","park_id":"xxxxxxxxxxx","mode":"community"}
 *           response - return success or error
 * @return : success
 *           {"save data"}
 *           error
 *           {"code":142,"error":"xxxxxx"}
 */
AV.Cloud.define("kongcv_get_accept_parkinfo", function(request, response) {
    var user_mobile = request.params.user_mobile;
    if (typeof(user_mobile) == "undefined" || user_mobile.length === 0) {
        console.log("kongcv_get_accept_parkinfo:",ERROR_MSG.ERR_USER_MOBILE_MUST_EXIST);
        response.success(ERROR_MSG.ERR_USER_MOBILE_MUST_EXIST);
        return;
    }
    
    var park_id = request.params.park_id;
    if (typeof(park_id) == "undefined" || park_id.length === 0) {
        console.log("kongcv_get_accept_parkinfo:",ERROR_MSG.ERR_PARK_ID_MUST_EXIST);
        response.success(ERROR_MSG.ERR_PARK_ID_MUST_EXIST);
        return;
    }
 
    var mode = request.params.mode;
    if (typeof(mode) == "undefined" || mode.length === 0) {
        console.log("kongcv_get_accept_parkinfo:",ERROR_MSG.ERR_MODE_MUST_EXIST);
        response.success(ERROR_MSG.ERR_MODE_MUST_EXIST);
        return;
    }

    var kongcv_park_cls;
    var kongcv_park_obj;
    if ("community" === mode) {
        kongcv_park_cls = kongcv_park_community_cls;
        kongcv_park_obj = new kongcv_park_community_cls();
        kongcv_park_obj.id = park_id;
    }
    else if ("curb" === mode) {
        kongcv_park_cls = kongcv_park_curb_cls;
        kongcv_park_obj = new kongcv_park_curb_cls();
        kongcv_park_obj.id = park_id;
    }
    else {
        console.log("kongcv_get_accept_parkinfo:",ERROR_MSG.ERR_INFO_FORMAT);
        response.success(ERROR_MSG.ERR_INFO_FORMAT);
        return;
    }

    var accept_query = new AV.Query(kongcv_accept_cls);
    if ("community" === mode) {
        accept_query.equalTo("park_community", kongcv_park_obj);
    }
    else if ("curb" === mode) {
        var now_date = new Date();
        var now_minseconds = now_date.getTime();
        var accept_minseconds = now_minseconds - limit_minseconds;
        var accept_date = new Date(accept_minseconds);
        accept_query.equalTo("park_curb", kongcv_park_obj);
        accept_query.equalTo("user_mobile", user_mobile);
        accept_query.greaterThan("updatedAt", accept_date);
    }
    accept_query.limit(1);
    accept_query.descending("createdAt");
    
    accept_query.find({
        success : function(results) {
            var accept = false;
            if (results.length > 0) {
                var kongcv_accept_obj = results[0];
                if ("community" === mode) {
                    if (user_mobile === kongcv_accept_obj.get("user_mobile")) {
                        accept = true;
                    }
                }
                else if ("curb" === mode) {
                    accept = true;
                }
            }

            var park_query = new AV.Query(kongcv_park_cls);
            //park_query.equalTo("objectId", park_id);
            if ("curb" === mode) {
                park_query.include("user_group");
            }

            park_query.include("user");
            park_query.include("hire_method");
            park_query.get(park_id, {
                success : function(park_obj) {
                    park_obj.set("hire_method", JSON.stringify(park_obj.get("hire_method")));
                    if ("curb" === mode) {
                        park_obj.set("user_group", JSON.stringify(park_obj.get("user_group")));
                    }
                    park_obj.set("user", JSON.stringify(park_obj.get("user")));

                    if (true === accept) {
                        park_obj.set("accept", 1);
                    }
                    else { 
                        park_obj.set("accept", 0);
                    }

                    response.success(park_obj);
                    return;
                },
                error : function(error) {
                    console.log("kongcv_get_accept_parkinfo:",error);
                    response.error(error);
                    return;
                }
            });

            return;
        },
        error : function(error) {
            console.log("kongcv_get_accept_parkinfo:",error);
            response.error(error);
            return;
        }
    });
});

/**
 * brief   : insert property
 * @param  : request - {"user_id":"xxxxxxxxxx","location_info":{"__type": "GeoPoint","latitude":11.1,"longitude":116.4}, "community_name":"xxxx","property_name":"xxxxx","city":"xxxx","rate":0.4,"mode":"community","use_token":1}
 *           response - return result or error
 * @return : RET_OK - success
 *           {"result":"{\"state\":\"ok\",\"code\":1,\"msg\":\"成功}"}
 *           RET_ERROR - system error
 *           {"code":601,"error":"xxxxxx"}
 */
AV.Cloud.define("kongcv_insert_property", function(request, response) {
    var user_id = request.params.user_id;
    if (typeof(user_id) == "undefined" || user_id.length === 0) {
        console.log("kongcv_insert_property:",ERROR_MSG.ERR_USER_ID_MUST_EXIST);
        response.success(ERROR_MSG.ERR_USER_ID_MUST_EXIST);
        return;
    }

    var user_obj; 
    var use_token = request.params.use_token;
    if (typeof(use_token) != "undefined" && 1 === use_token) {
        user_obj = request.user; 
        if (typeof(user_obj) == "undefined" || user_obj.length === 0) {
            console.log("kongcv_insert_property:",ERROR_MSG.ERR_USER_SESSIONTOKEN_MUST_EXIST);
            response.success(ERROR_MSG.ERR_USER_SESSIONTOKEN_MUST_EXIST);
            return;
        }

        if (user_id != user_obj.id) {
            console.log("kongcv_insert_property:",ERROR_MSG.ERR_USERID_SESSIONTOKEN_UNMATCHED);
            response.success(ERROR_MSG.ERR_USERID_SESSIONTOKEN_UNMATCHED);
            return;
        }
    }
    else {
        user_obj = new user_cls();
        user_obj.id = user_id; 
    }

    var city = request.params.city;
    if (typeof(city) == "undefined" || city.length === 0) {
        console.log("kongcv_insert_property:",ERROR_MSG.ERR_CITY_MUST_EXIST);
        response.success(ERROR_MSG.ERR_CITY_MUST_EXIST);
        return;
    }

    var community_name = request.params.community_name;
    if (typeof(community_name) == "undefined" || community_name.length === 0) {
        console.log("kongcv_insert_property:",ERROR_MSG.ERR_COMMUNITY_NAME_MUST_EXIST);
        response.success(ERROR_MSG.ERR_COMMUNITY_NAME_MUST_EXIST);
        return;
    }

    var property_name = request.params.property_name;
    if (typeof(property_name) == "undefined" || property_name.length === 0) {
        console.log("kongcv_insert_property:",ERROR_MSG.ERR_PROPERTY_NAME_MUST_EXIST);
        response.success(ERROR_MSG.ERR_PROPERTY_NAME_MUST_EXIST);
        return;
    }
 
    var location_info = request.params.location_info;
    if (typeof(location_info) == "undefined" || location_info.length === 0) {
        console.log("kongcv_insert_property:",ERROR_MSG.ERR_LOCATION_INFO_MUST_EXIST);
        response.success(ERROR_MSG.ERR_LOCATION_INFO_MUST_EXIST);
        return;
    }
    if (location_info.latitude <= 0 || location_info.longitude <= 0) {
        console.log("kongcv_insert_property:",ERROR_MSG.ERR_LOCATION_INFO_MUST_EXIST);
        response.success(ERROR_MSG.ERR_LOCATION_INFO_MUST_EXIST);
        return;
    }
    
    var property_rate = request.params.rate;
    if (typeof(property_rate) == "undefined" || property_rate.length === 0) {
        console.log("kongcv_insert_property:",ERROR_MSG.ERR_RATE_MUST_EXIST);
        response.success(ERROR_MSG.ERR_MODE_MUST_EXIST);
        return;
    }
    if (property_rate < 0 || property_rate > 1) {
        console.log("kongcv_insert_property:",ERROR_MSG.ERR_RATE_MUST_EXIST);
        response.success(ERROR_MSG.ERR_RATE_MUST_EXIST);
        return;
    }

    var mode = request.params.mode;
    if (typeof(mode) == "undefined" || mode.length === 0) {
        console.log("kongcv_insert_property:",ERROR_MSG.ERR_MODE_MUST_EXIST);
        response.success(ERROR_MSG.ERR_MODE_MUST_EXIST);
        return;
    }

    var kongcv_property_obj = new kongcv_property_cls();
    kongcv_property_obj.set("user", user_obj);
    kongcv_property_obj.set("community", community_name);
    kongcv_property_obj.set("name", property_name);
    kongcv_property_obj.set("location", location_info); 
    kongcv_property_obj.set("city", city); 
    kongcv_property_obj.set("rate", property_rate); 
    kongcv_property_obj.save().then(
        function() {
            response.success(RESULT_MSG.RET_OK);
            return;
        },
        function(error) {
            console.log("kongcv_insert_property:",error);
            response.error(error);
            return;
        } 
    );
});

/**
 * brief   : insert park autopush
 * @param  : request - {"user_id":"xxxxxxxxxx","address":"xxxx","city":"xxx","location_info":{"__type": "GeoPoint","latitude":11.1,"longitude":116.4}, "use_token":1}
 *           response - return result or error
 * @return : RET_OK - success
 *           {"result":"{\"state\":\"ok\",\"code\":1,\"msg\":\"成功}"}
 *           RET_ERROR - system error
 *           {"code":601,"error":"xxxxxx"}
 */
AV.Cloud.define("kongcv_insert_park_autopush", function(request, response) {
    var user_id = request.params.user_id;
    if (typeof(user_id) == "undefined" || user_id.length === 0) {
        console.log("kongcv_insert_park_autopush:",ERROR_MSG.ERR_USER_ID_MUST_EXIST);
        response.success(ERROR_MSG.ERR_USER_ID_MUST_EXIST);
        return;
    }

    var user_obj; 
    var use_token = request.params.use_token;
    if (typeof(use_token) != "undefined" && 1 === use_token) {
        user_obj = request.user; 
        if (typeof(user_obj) == "undefined" || user_obj.length === 0) {
            console.log("kongcv_insert_park_autopush:",ERROR_MSG.ERR_USER_SESSIONTOKEN_MUST_EXIST);
            response.success(ERROR_MSG.ERR_USER_SESSIONTOKEN_MUST_EXIST);
            return;
        }

        if (user_id != user_obj.id) {
            console.log("kongcv_insert_park_autopush:",ERROR_MSG.ERR_USERID_SESSIONTOKEN_UNMATCHED);
            response.success(ERROR_MSG.ERR_USERID_SESSIONTOKEN_UNMATCHED);
            return;
        }
    }
    else {
        user_obj = new user_cls();
        user_obj.id = user_id; 
    }
 
    var address = request.params.address;
    if (typeof(address) == "undefined" || address.length === 0) {
        console.log("kongcv_insert_park_autopush:",ERROR_MSG.ERR_ADDRESS_MUST_EXIST);
        response.success(ERROR_MSG.ERR_ADDRESS_MUST_EXIST);
        return;
    }
    
    var city = request.params.city;
    if (typeof(city) == "undefined" || city.length === 0) {
        console.log("kongcv_insert_park_autopush:",ERROR_MSG.ERR_CITY_MUST_EXIST);
        response.success(ERROR_MSG.ERR_CITY_MUST_EXIST);
        return;
    }

    var location_info = request.params.location_info;
    if (typeof(location_info) == "undefined" || location_info.length === 0) {
        console.log("kongcv_insert_park_autopush:",ERROR_MSG.ERR_LOCATION_INFO_MUST_EXIST);
        response.success(ERROR_MSG.ERR_LOCATION_INFO_MUST_EXIST);
        return;
    }
    if (location_info.latitude <= 0 || location_info.longitude <= 0) {
        console.log("kongcv_insert_park_autopush:",ERROR_MSG.ERR_LOCATION_INFO_MUST_EXIST);
        response.success(ERROR_MSG.ERR_LOCATION_INFO_MUST_EXIST);
        return;
    }
    
    var kongcv_park_autopush_obj = new kongcv_park_autopush_cls();
    kongcv_park_autopush_obj.set("user", user_obj);
    kongcv_park_autopush_obj.set("address", address);
    kongcv_park_autopush_obj.set("city", city);
    kongcv_park_autopush_obj.set("location", location_info); 
    kongcv_park_autopush_obj.save().then(
        function() {
            response.success(RESULT_MSG.RET_OK);
            return;
        },
        function(error) {
            console.log("kongcv_insert_park_autopush:",error);
            
            if (137 === error.code) {
                console.log("kongcv_insert_park_autopush:",ERROR_MSG.ERR_SAME_AUTOPUSH_EXIST);
                response.success(ERROR_MSG.ERR_SAME_AUTOPUSH_EXIST);
            }
            else {
                response.error(error);
            }

            return;
        } 
    );
});

/**
 * brief   : remove park autopush
 * @param  : request - {"autopush_id":"xxxxxxxxxx"}
 *           response - return result or error
 * @return : RET_OK - success
 *           {"result":"{\"state\":\"ok\",\"code\":1,\"msg\":\"成功}"}
 *           RET_ERROR - system error
 *           {"code":601,"error":"xxxxxx"}
 */
AV.Cloud.define("kongcv_remove_park_autopush", function(request, response) {
    var autopush_id = request.params.autopush_id;
    if (typeof(autopush_id) == "undefined" || autopush_id.length === 0) {
        console.log("kongcv_remove_park_autopush:",ERROR_MSG.ERR_AUTOPUSH_ID_MUST_EXIST);
        response.success(ERROR_MSG.ERR_AUTOPUSH_ID_MUST_EXIST);
        return;
    }

    var kongcv_park_autopush_obj = new kongcv_park_autopush_cls();
    kongcv_park_autopush_obj.id = autopush_id;
    
    kongcv_park_autopush_obj.destroy().then(
        function(obj) {
            response.success(RESULT_MSG.RET_OK);
            return;
        },
        function(error) {
            console.log("kongcv_remove_park_autopush error:", error);
            response.error(error);
            return;
        }
    );
});

/**
 * brief   : change park autopush
 * @param  : request - {"autopush_id":"xxxxxxxxxx", "open":1}
 *           response - return result or error
 * @return : RET_OK - success
 *           {"result":"{\"state\":\"ok\",\"code\":1,\"msg\":\"成功}"}
 *           RET_ERROR - system error
 *           {"code":601,"error":"xxxxxx"}
 */
AV.Cloud.define("kongcv_change_park_autopush", function(request, response) {
    var autopush_id = request.params.autopush_id;
    if (typeof(autopush_id) == "undefined" || autopush_id.length === 0) {
        console.log("kongcv_change_park_autopush:",ERROR_MSG.ERR_AUTOPUSH_ID_MUST_EXIST);
        response.success(ERROR_MSG.ERR_AUTOPUSH_ID_MUST_EXIST);
        return;
    }
    
    var open = request.params.open;
    if (typeof(open) == "undefined" || open.length === 0) {
        console.log("kongcv_change_park_autopush:",ERROR_MSG.ERR_AUTOPUSH_OPEN_MUST_EXIST);
        response.success(ERROR_MSG.ERR_AUTOPUSH_OPEN_MUST_EXIST);
        return;
    }

    var kongcv_park_autopush_obj = new kongcv_park_autopush_cls();
    kongcv_park_autopush_obj.id = autopush_id;

    kongcv_park_autopush_obj.set("open", open);
    
    kongcv_park_autopush_obj.save().then(
        function(obj) {
            response.success(RESULT_MSG.RET_OK);
            return;
        },
        function(error) {
            console.log("kongcv_change_park_autopush error:", error);
            response.error(error);
            return;
        }
    );


});
 
 /**
 * brief   : get park autopush
 * @param  : request - {"user_id":"xxxxxxxxxx", "use_token":1}
 *           response - return result or error
 * @return : RET_OK - success
 *           {"result":"{\"state\":\"ok\",\"code\":1,\"msg\":\"成功}"}
 *           RET_ERROR - system error
 *           {"code":601,"error":"xxxxxx"}
 */
AV.Cloud.define("kongcv_get_park_autopush", function(request, response) {
    var user_id = request.params.user_id;
    if (typeof(user_id) == "undefined" || user_id.length === 0) {
        console.log("kongcv_get_park_autopush:",ERROR_MSG.ERR_USER_ID_MUST_EXIST);
        response.success(ERROR_MSG.ERR_USER_ID_MUST_EXIST);
        return;
    }
    
    var user_obj; 
    var use_token = request.params.use_token;
    if (typeof(use_token) != "undefined" && 1 === use_token) {
        user_obj = request.user; 
        if (typeof(user_obj) == "undefined" || user_obj.length === 0) {
            console.log("kongcv_get_park_autopush:",ERROR_MSG.ERR_USER_SESSIONTOKEN_MUST_EXIST);
            response.success(ERROR_MSG.ERR_USER_SESSIONTOKEN_MUST_EXIST);
            return;
        }

        if (user_id != user_obj.id) {
            console.log("kongcv_get_park_autopush:",ERROR_MSG.ERR_USERID_SESSIONTOKEN_UNMATCHED);
            response.success(ERROR_MSG.ERR_USERID_SESSIONTOKEN_UNMATCHED);
            return;
        }
    }
    else {
        user_obj = new user_cls();
        user_obj.id = user_id; 
    }

    var autopush_query = new AV.Query(kongcv_park_autopush_cls);
    autopush_query.equalTo('user', user_obj);
    
    autopush_query.find({
        success :function(results) {
            response.success(results);
            return;
        },
        error : function(error) {
            console.log("kongcv_get_park_autopush:",error);
            response.success(error);
            return;
        }
    });
});
 
/**
 * brief   : insert park data
 * @param  : request - {"user_id":"xxxxxxxxxx","worker_id":"xxxxxxxxxxx","proxy_mobile":"xxxx","address":"xxxxx","park_detail":"xxxx","park_description":"xxxx","location_info":{"__type": "GeoPoint","latitude":11.1,"longitude":116.4}, "hire_start":"2015-10-17 08:00:00", "hire_end":"2015-10-17 18:00:00","no_hire":["1","2"], "tail_num":"5","city":"beijing", "normal":true, "park_area":10,"park_height":5,"gate_card":"xxxxx","hire_method_id":["5620a6dc60b27457e84bb21d"],"hire_field":["all_time_day"],"hire_price":["10"],"hire_time":["9:00 - 20:00"],"park_struct":0,"mode":"community","use_token":1,"personal":1}
 *           response - return result or error
 * @return : RET_OK - success
 *           {"result":"{\"state\":\"ok\",\"code\":1,\"msg\":\"成功}"}
 *           RET_ERROR - system error
 *           {"code":601,"error":"xxxxxx"}
 */
var _kongcv_search_autopush = function(location_info, address, park_id, mode) {
    console.log("invoke search autopush");
    var point = new AV.GeoPoint(location_info);
    var max_distance = 1;
    
    var autopush_query = new AV.Query(kongcv_park_autopush_cls);
    autopush_query.withinKilometers("location", point, max_distance);
    autopush_query.equalTo('open', 1);
    autopush_query.include("user");

    var mode_string = "";
    if ("curb" === mode) {
        mode_string = "商业车位";
    }
    else if ("community" === mode) {
        mode_string = "个人车位";
    }
    else if ("share" === mode) {
        mode_string = "免费车位";
    }
    
    autopush_query.find({
        success :function(results) {
            for (var i = 0; i < results.length; i++) {
                var autopush_user = results[i].get("user");
                var device_token = autopush_user._serverData.device_token;
                var device_type = autopush_user._serverData.device_type;
                var mobile = autopush_user._serverData.mobilePhoneNumber;
                var extras = {'push_type':'park_push', 'park_id':park_id, 'mode':mode};
                var push_info = PUSH_INFO.PARK_PUSH + address + mode_string;
 
                _kongcv_jpush_message_p2p(mobile, device_token, device_type, push_info, extras);
                _kongcv_sms_push(mobile, "park_push", 0, address, mode_string);
            }

            return;
        },
        error : function(error) {
            console.log("kongcv_location_search:",error);
            return;
        }
    });
};

AV.Cloud.define("kongcv_insert_parkdata", function(request, response) {
    var user_id = request.params.user_id;
    if (typeof(user_id) == "undefined" || user_id.length === 0) {
        console.log("kongcv_insert_parkdata:",ERROR_MSG.ERR_USER_ID_MUST_EXIST);
        response.success(ERROR_MSG.ERR_USER_ID_MUST_EXIST);
        return;
    }

    var user_obj; 
    var use_token = request.params.use_token;
    if (typeof(use_token) != "undefined" && 1 === use_token) {
        user_obj = request.user; 
        if (typeof(user_obj) == "undefined" || user_obj.length === 0) {
            console.log("kongcv_insert_parkdata:",ERROR_MSG.ERR_USER_SESSIONTOKEN_MUST_EXIST);
            response.success(ERROR_MSG.ERR_USER_SESSIONTOKEN_MUST_EXIST);
            return;
        }

        if (user_id != user_obj.id) {
            console.log("kongcv_insert_parkdata:",ERROR_MSG.ERR_USERID_SESSIONTOKEN_UNMATCHED);
            response.success(ERROR_MSG.ERR_USERID_SESSIONTOKEN_UNMATCHED);
            return;
        }
    }
    else {
        user_obj = new user_cls();
        user_obj.id = user_id; 
    }

    var city = request.params.city;
    /*if (typeof(city) == "undefined" || city.length === 0) {
        console.log("kongcv_insert_parkdata:",ERROR_MSG.ERR_CITY_MUST_EXIST);
        response.success(ERROR_MSG.ERR_CITY_MUST_EXIST);
        return;
    }*/

    var address = request.params.address;
    if (typeof(address) == "undefined" || address.length === 0) {
        console.log("kongcv_insert_parkdata:",ERROR_MSG.ERR_ADDRESS_MUST_EXIST);
        response.success(ERROR_MSG.ERR_ADDRESS_MUST_EXIST);
        return;
    }

    var park_detail = request.params.park_detail;
    if (typeof(park_detail) == "undefined" || park_detail.length === 0) {
        console.log("kongcv_insert_parkdata:",ERROR_MSG.ERR_PARK_DETAIL_MUST_EXIST);
        response.success(ERROR_MSG.ERR_PARK_DETAIL_MUST_EXIST);
        return;
    }

    var community_address = address;
    address += '&'+ park_detail;
    console.log("address:",address);
     
    var park_description = request.params.park_description;
    
    var location_info = request.params.location_info;
    if (typeof(location_info) == "undefined" || location_info.length === 0) {
        console.log("kongcv_insert_parkdata:",ERROR_MSG.ERR_LOCATION_INFO_MUST_EXIST);
        response.success(ERROR_MSG.ERR_LOCATION_INFO_MUST_EXIST);
        return;
    }
    if (location_info.latitude <= 0 || location_info.longitude <= 0) {
        console.log("kongcv_insert_parkdata:",ERROR_MSG.ERR_LOCATION_INFO_MUST_EXIST);
        response.success(ERROR_MSG.ERR_LOCATION_INFO_MUST_EXIST);
        return;
    }
 
    var park_struct = request.params.park_struct;
    if (typeof(park_struct) == "undefined" || park_struct.length === 0) {
        response.success(ERROR_MSG.ERR_PARK_STRUCT_MUST_EXIST);
        return;
    }
   
    var mode = request.params.mode;
    if (typeof(mode) == "undefined" || mode.length === 0) {
        console.log("kongcv_insert_parkdata:",ERROR_MSG.ERR_MODE_MUST_EXIST);
        response.success(ERROR_MSG.ERR_MODE_MUST_EXIST);
        return;
    }
     
    var hire_method = [];
    var hire_price = [];
    var hire_time = [];
    var hire_method_array = request.params.hire_method_id
    var hire_field_array = request.params.hire_field;
    var hire_price_array = request.params.hire_price;
    var hire_time_array = request.params.hire_time;
    if (typeof(hire_method_array) == "undefined" || hire_method_array.length === 0) {
        console.log("kongcv_insert_parkdata:",ERROR_MSG.ERR_HIRE_METHOD_MUST_EXIST);
        response.success(ERROR_MSG.ERR_HIRE_METHOD_MUST_EXIST);
        return;
    }
    if (typeof(hire_field_array) == "undefined" || hire_field_array.length === 0) {
        console.log("kongcv_insert_parkdata:",ERROR_MSG.ERR_HIRE_FIELD_MUST_EXIST);
        response.success(ERROR_MSG.ERR_HIRE_FIELD_MUST_EXIST);
        return;
    }
    if (typeof(hire_price_array) == "undefined" || hire_price_array.length === 0) {
        console.log("kongcv_insert_parkdata:",ERROR_MSG.ERR_HIRE_PRICE_MUST_EXIST);
        response.success(ERROR_MSG.ERR_HIRE_PRICE_MUST_EXIST);
        return;
    }
    
    var kongcv_park_obj;
    var hire_method_num = hire_method_array.length;
    var hire_field_num = hire_field_array.length;
    var hire_price_num = hire_price_array.length;
    var hire_time_num = hire_time_array.length; 
    if ("community" === mode) {
        kongcv_park_obj = new kongcv_park_community_cls(); 
        if (hire_method_num != hire_price_num || hire_method_num != hire_time_num) {
            console.log("kongcv_insert_parkdata:",ERROR_MSG.ERR_INFO_FORMAT);
            response.success(ERROR_MSG.ERR_INFO_FORMAT);
            return;
        }
    }
    else if ("curb" === mode) {
        kongcv_park_obj = new kongcv_park_curb_cls();
        
        if (hire_method_num != hire_price_num) {
            console.log("kongcv_insert_parkdata:",ERROR_MSG.ERR_INFO_FORMAT);
            response.success(ERROR_MSG.ERR_INFO_FORMAT);
            return;
        }
    }
    else {
        console.log("kongcv_insert_parkdata:",ERROR_MSG.ERR_INFO_FORMAT);
        response.success(ERROR_MSG.ERR_INFO_FORMAT);
        return;
    }

    if (hire_method_num != hire_field_num) {
            console.log("kongcv_insert_parkdata:",ERROR_MSG.ERR_INFO_FORMAT);
            response.success(ERROR_MSG.ERR_INFO_FORMAT);
            return;
    }

    for (var i = 0; i < hire_method_num; i++) {
        var hire_method_obj = new kongcv_hire_method_cls();
        hire_method_obj.id = hire_method_array[i];
        hire_method.push(hire_method_obj);
        hire_price.push(hire_price_array[i]);
        hire_time.push(hire_time_array[i]);

        var price_num = hire_price_array[i].split('/')[0];
        kongcv_park_obj.set(hire_field_array[i], Number(price_num));
    } 

    if ("community" === mode) { 
        var hire_start = request.params.hire_start;
        if (typeof(hire_start) == "undefined" || hire_start.length === 0) {
            console.log("kongcv_insert_parkdata:",ERROR_MSG.ERR_HIRE_START_MUST_EXIST);
            response.success(ERROR_MSG.ERR_HIRE_START_MUST_EXIST);
            return;
        }

        var hire_end = request.params.hire_end;
        if (typeof(hire_end) == "undefined" || hire_end.length === 0) {
            console.log("kongcv_insert_parkdata:",ERROR_MSG.ERR_HIRE_END_MUST_EXIST);
            response.success(ERROR_MSG.ERR_HIRE_END_MUST_EXIST);
            return;
        } 

        var personal = request.params.personal;
        if (typeof(personal) == "undefined" || personal.length === 0) {
            console.log("kongcv_insert_parkdata:",ERROR_MSG.ERR_PERSONAL_MUST_EXIST);
            response.success(ERROR_MSG.ERR_PERSONAL_MUST_EXIST);
            return;
        }

        var community_query = new AV.Query(kongcv_park_community_cls);
        community_query.equalTo("user", user_obj);
        community_query.find({
            success : function(results) { 
                if (results.length < limit_records) {
                    var no_hire = request.params.no_hire;

                    var normal = request.params.normal;
                    /*if (typeof(normal) == "undefined" || normal.length === 0) {
                      response.success(ERROR_MSG.ERR_NORMAL_MUST_EXIST);
                      return;
                      }*/

                    var park_area = request.params.park_area;
                    /*if (typeof(park_area) == "undefined" || park_area.length === 0) {
                      response.success(ERROR_MSG.ERR);
                      return;
                      }*/

                    var park_height = request.params.park_height;
                    /*if (typeof(park_height) == "undefined" || park_height.length === 0) {
                      response.success(ERROR_MSG.ERR);
                      return;
                      }*/

                    var gate_card = request.params.gate_card;
                    /*if (typeof(gate_card) == "undefined" || gate_card.length === 0) {
                      response.success(ERROR_MSG.ERR);
                      return;
                      }*/

                    var tail_num = request.params.tail_num;

                    kongcv_park_obj.set("city", city);
                    kongcv_park_obj.set("address", address);
                    kongcv_park_obj.set("hire_start", new Date(hire_start));
                    kongcv_park_obj.set("hire_end", new Date(hire_end));
                    kongcv_park_obj.set("no_hire", no_hire);
                    kongcv_park_obj.set("tail_num", tail_num);
                    kongcv_park_obj.set("location", location_info); 
                    kongcv_park_obj.set("hire_method", hire_method);
                    kongcv_park_obj.set("hire_price", hire_price);
                    kongcv_park_obj.set("hire_time", hire_time);
                    kongcv_park_obj.set("normal", normal);
                    kongcv_park_obj.set("park_area", park_area);
                    kongcv_park_obj.set("park_height", park_height);
                    kongcv_park_obj.set("gate_card", gate_card);
                    kongcv_park_obj.set("park_struct", park_struct);
                    kongcv_park_obj.set("user", user_obj);
                    kongcv_park_obj.set("park_description", park_description);

                    var property_distance = 1;
                    var point = new AV.GeoPoint(location_info);
                    var property_query = new AV.Query(kongcv_property_cls);
                    property_query.withinKilometers("location", point, property_distance);
                    property_query.limit(3);

                    property_query.find({
                        success :function(results) {
                            if (results.length > 0) {
                                for (var i = 0; i < results.length; i++) {
                                    var property_obj = results[i];
                                    var community_name = property_obj.get("community");
                                    var exist = community_address.indexOf(community_name);
                                    if (exist >= 0) {
                                        kongcv_park_obj.set("property", property_obj);
                                        break;
                                    }
                                }
                            }

                            kongcv_park_obj.save().then(
                                function(park_obj) {
                                    var park_id = park_obj.id;
                                    console.log("park_id:",park_id);
                                    _kongcv_search_autopush(location_info, address, park_id, mode);

                                    response.success(RESULT_MSG.RET_OK);
                                    return;
                                },
                                function(error) {
                                    console.log("kongcv_insert_parkdata:",error);
                                    
                                    if (137 === error.code) {
                                        console.log("kongcv_insert_parkdata:",ERROR_MSG.ERR_HIRE_PARK_SAME_RECORD);
                                        response.success(ERROR_MSG.ERR_HIRE_PARK_SAME_RECORD);
                                    }
                                    else {
                                        response.error(error);
                                    }

                                    return;
                                }
                            );
                        },
                        error : function(error) {
                            console.log("kongcv_insert_parkdata:",error);
                            response.error(error);
                            return;
                        }
                    });
                }
                else {
                    console.log("kongcv_insert_parkdata:",ERROR_MSG.ERR_HIRE_COMMUNITY_RECORD_LIMIT);
                    response.success(ERROR_MSG.ERR_HIRE_COMMUNITY_RECORD_LIMIT);
                    return;
                }
            },
            error : function(error) {
                console.log("kongcv_insert_parkdata:",error);
                response.error(error);
                return;
            }
        });
    }
    else if ("curb" === mode) {
        kongcv_park_obj.set("city", city);
        kongcv_park_obj.set("address", address);
        kongcv_park_obj.set("location", location_info);
        kongcv_park_obj.set("hire_method", hire_method);
        kongcv_park_obj.set("hire_price", hire_price);
        kongcv_park_obj.set("hire_time", hire_time);
        kongcv_park_obj.set("park_description", park_description);
        kongcv_park_obj.set("park_struct", park_struct);


        var worker_id = user_id; 

        var user_mobile = request.params.worker_id;
        var link = true;
        if (typeof(user_mobile) == "undefined" || user_mobile.length === 0) {
            link = false;
        }

        var worker_obj = new user_cls();
        worker_obj.id = worker_id;
        kongcv_park_obj.set("worker", worker_obj);

        var proxy_mobile = request.params.proxy_mobile;
        if (typeof(proxy_mobile) != "undefined" && proxy_mobile.length != 0) {
            kongcv_park_obj.set("proxy_mobile", proxy_mobile);
        }

        if (true === link) {
            AV.User.logIn(user_0, user_0_ps, {
                success :function(user_admin) { 
                    var user_query = new AV.Query(AV.User); 
                    user_query.equalTo("mobilePhoneNumber", user_mobile);
                    user_query.find({
                        success : function(results) {
                            if (0 === results.length) {
                                console.log("kongcv_insert_parkdata:",ERROR_MSG.ERR_USER_NO_SIGNUP);
                                response.success(ERROR_MSG.ERR_USER_NO_SIGNUP);
                                return;
                            }

                            var user_obj = results[0];
                            //var user_obj = new user_cls();
                            //user_obj.id = user.id;

                            //var user_array = [];
                            //user_array.push(user_obj);
                            //kongcv_park_obj.set("user_group", user_array);
                            kongcv_park_obj.set("user", user_obj);
                            kongcv_park_obj.save().then(
                                function(park_obj) {
                                    var park_id = park_obj.id;
                                    _kongcv_search_autopush(location_info, address, park_id, mode);

                                    response.success(RESULT_MSG.RET_OK);
                                    return;
                                },
                                function(error) {
                                    console.log("kongcv_insert_parkdata:",error);
                                    
                                    if (137 === error.code) {
                                        console.log("kongcv_insert_parkdata:",ERROR_MSG.ERR_HIRE_PARK_SAME_RECORD);
                                        response.success(ERROR_MSG.ERR_HIRE_PARK_SAME_RECORD);
                                    }
                                    else {
                                        response.error(error);
                                    }

                                    return;
                                }
                            );
                        },
                        error : function(error) {
                            console.log("kongcv_insert_parkdata:",error);
                            response.error(error);
                            return;
                        }
                    });
                },
                error : function(error) {
                    console.log("kongcv_insert_parkdata:",error);
                    response.error(error);
                    return;
                }
            });
        }
        else {
            kongcv_park_obj.save().then(
                function() {
                    response.success(RESULT_MSG.RET_OK);
                    return;
                },
                function(error) {
                    console.log("kongcv_insert_parkdata:",error);
                    
                    if (137 === error.code) {
                        console.log("kongcv_insert_parkdata:",ERROR_MSG.ERR_HIRE_PARK_SAME_RECORD);
                        response.success(ERROR_MSG.ERR_HIRE_PARK_SAME_RECORD);
                    }
                    else {
                        response.error(error);
                    }

                    return;
                }
            );
        }
    }
    else {
        console.log("kongcv_insert_parkdata:",ERROR_MSG.ERR_INFO_FORMAT);
        response.success(ERROR_MSG.ERR_INFO_FORMAT);
        return;
    }
}); 
 
/**
 * brief   : put park data
 * @param  : request - {"user_id":"xxxxx","park_id":"xxxxxxxxxx","proxy_mobile":"xxxx","address":"xxxxx","park_detail":"xxxx","park_description":"xxxx","location_info":{"__type": "GeoPoint","latitude":11.1,"longitude":116.4}, "hire_start":"2015-10-17 08:00:00", "hire_end":"2015-10-17 18:00:00","no_hire":["1","2"], "tail_num":"5","city":"beijing", "normal":true, "park_area":10,"park_height":5,"gate_card":"xxxxx","hire_method_id":["5620a6dc60b27457e84bb21d"],"hire_price":["10"],"hire_time":["9:00 - 20:00"],"park_struct":0,"mode":"community","use_token":1}
 *           response - return result or error
 * @return : RET_OK - success
 *           {"result":"{\"state\":\"ok\",\"code\":1,\"msg\":\"成功}"}
 *           RET_ERROR - system error
 *           {"code":601,"error":"xxxxxx"}
 */
AV.Cloud.define("kongcv_put_parkdata", function(request, response) { 
    var user_id = request.params.user_id;
    if (typeof(user_id) == "undefined" || user_id.length === 0) {
        console.log("kongcv_put_parkdata:",ERROR_MSG.ERR_USER_ID_MUST_EXIST);
        response.success(ERROR_MSG.ERR_USER_ID_MUST_EXIST);
        return;
    }

    var use_token = request.params.use_token;
    if (typeof(use_token) != "undefined" && 1 === use_token) {
        var user_obj = request.user; 
        if (typeof(user_obj) == "undefined" || user_obj.length === 0) {
            console.log("kongcv_put_parkdata:",ERROR_MSG.ERR_USER_SESSIONTOKEN_MUST_EXIST);
            response.success(ERROR_MSG.ERR_USER_SESSIONTOKEN_MUST_EXIST);
            return;
        }

        if (user_id != user_obj.id) {
            console.log("kongcv_put_parkdata:",ERROR_MSG.ERR_USERID_SESSIONTOKEN_UNMATCHED);
            response.success(ERROR_MSG.ERR_USERID_SESSIONTOKEN_UNMATCHED);
            return;
        }
    }

    var park_id = request.params.park_id;
    if (typeof(park_id) == "undefined" || park_id.length === 0) {
        console.log("kongcv_put_parkdata:",ERROR_MSG.ERR_PARK_ID_MUST_EXIST);
        response.success(ERROR_MSG.ERR_PARK_ID_MUST_EXIST);
        return;
    }

    var city = request.params.city;
    if (typeof(city) == "undefined" || city.length === 0) {
        console.log("kongcv_put_parkdata:",ERROR_MSG.ERR_CITY_MUST_EXIST);
        response.success(ERROR_MSG.ERR_CITY_MUST_EXIST);
        return;
    }

    var address = request.params.address;
    if (typeof(address) == "undefined" || address.length === 0) {
        console.log("kongcv_put_parkdata:",ERROR_MSG.ERR_ADDRESS_MUST_EXIST);
        response.success(ERROR_MSG.ERR_ADDRESS_MUST_EXIST);
        return;
    }

    var park_detail = request.params.park_detail;
    if (typeof(park_detail) == "undefined" || park_detail.length === 0) {
        console.log("kongcv_put_parkdata:",ERROR_MSG.ERR_PARK_DETAIL_MUST_EXIST);
        response.success(ERROR_MSG.ERR_PARK_DETAIL_MUST_EXIST);
        return;
    }

    address += '&'+ park_detail;
     
    var park_description = request.params.park_description;
    
    var location_info = request.params.location_info;
    if (typeof(location_info) == "undefined" || location_info.length === 0) {
        console.log("kongcv_put_parkdata:",ERROR_MSG.ERR_LOCATION_INFO_MUST_EXIST);
        response.success(ERROR_MSG.ERR_LOCATION_INFO_MUST_EXIST);
        return;
    }
    if (location_info.latitude <= 0 || location_info.longitude <= 0) {
        console.log("kongcv_put_parkdata:",ERROR_MSG.ERR_LOCATION_INFO_MUST_EXIST);
        response.success(ERROR_MSG.ERR_LOCATION_INFO_MUST_EXIST);
        return;
    }
 
    var park_struct = request.params.park_struct;
    if (typeof(park_struct) == "undefined" || park_struct.length === 0) {
        response.success(ERROR_MSG.ERR_PARK_STRUCT_MUST_EXIST);
        return;
    }
   
    var mode = request.params.mode;
    if (typeof(mode) == "undefined" || mode.length === 0) {
        console.log("kongcv_put_parkdata:",ERROR_MSG.ERR_MODE_MUST_EXIST);
        response.success(ERROR_MSG.ERR_MODE_MUST_EXIST);
        return;
    }
     
    var hire_method = [];
    var hire_price = [];
    var hire_time = [];
    var hire_method_array = request.params.hire_method_id
    var hire_field_array = request.params.hire_field;
    var hire_price_array = request.params.hire_price;
    var hire_time_array = request.params.hire_time;
    if (typeof(hire_method_array) == "undefined" || hire_method_array.length === 0) {
        console.log("kongcv_put_parkdata:",ERROR_MSG.ERR_HIRE_METHOD_MUST_EXIST);
        response.success(ERROR_MSG.ERR_HIRE_METHOD_MUST_EXIST);
        return;
    }
    if (typeof(hire_field_array) == "undefined" || hire_field_array.length === 0) {
        console.log("kongcv_put_parkdata:",ERROR_MSG.ERR_HIRE_FIELD_MUST_EXIST);
        response.success(ERROR_MSG.ERR_HIRE_FIELD_MUST_EXIST);
        return;
    }
    if (typeof(hire_price_array) == "undefined" || hire_price_array.length === 0) {
        console.log("kongcv_put_parkdata:",ERROR_MSG.ERR_HIRE_PRICE_MUST_EXIST);
        response.success(ERROR_MSG.ERR_HIRE_PRICE_MUST_EXIST);
        return;
    }

    var hire_method_num = hire_method_array.length;
    var hire_field_num = hire_field_array.length;
    var hire_price_num = hire_price_array.length;
    var hire_time_num = hire_time_array.length; 
    if ("community" === mode) {
        if (hire_method_num != hire_price_num || hire_method_num != hire_time_num) {
            console.log("kongcv_put_parkdata:",ERROR_MSG.ERR_INFO_FORMAT);
            response.success(ERROR_MSG.ERR_INFO_FORMAT);
            return;
        }
    }
    else if ("curb" === mode) {
        if (hire_method_num != hire_price_num) {
            console.log("kongcv_put_parkdata:",ERROR_MSG.ERR_INFO_FORMAT);
            response.success(ERROR_MSG.ERR_INFO_FORMAT);
            return;
        }
    }
    else {
        console.log("kongcv_put_parkdata:",ERROR_MSG.ERR_INFO_FORMAT);
        response.success(ERROR_MSG.ERR_INFO_FORMAT);
        return;
    }

    if (hire_method_num != hire_field_num) {
        console.log("kongcv_put_parkdata:",ERROR_MSG.ERR_INFO_FORMAT);
        response.success(ERROR_MSG.ERR_INFO_FORMAT);
        return;
    }

    for (var i = 0; i < hire_method_num; i++) {
        var hire_method_obj = new kongcv_hire_method_cls();
        hire_method_obj.id = hire_method_array[i];
        hire_method.push(hire_method_obj);
        hire_price.push(hire_price_array[i]);
        hire_time.push(hire_time_array[i]);    
    } 

    if ("community" === mode) { 
        var hire_start = request.params.hire_start;
        if (typeof(hire_start) == "undefined" || hire_start.length === 0) {
            console.log("kongcv_put_parkdata:",ERROR_MSG.ERR_HIRE_START_MUST_EXIST);
            response.success(ERROR_MSG.ERR_HIRE_START_MUST_EXIST);
            return;
        }

        var hire_end = request.params.hire_end;
        if (typeof(hire_end) == "undefined" || hire_end.length === 0) {
            console.log("kongcv_put_parkdata:",ERROR_MSG.ERR_HIRE_END_MUST_EXIST);
            response.success(ERROR_MSG.ERR_HIRE_END_MUST_EXIST);
            return;
        }
   
        var community_query = new AV.Query(kongcv_park_community_cls);
        console.log("check address")
        community_query.get(park_id, {
            success : function(kongcv_park_community_obj) {
                if (0 === kongcv_park_community_obj.get("park_space")) {
                    console.log("kongcv_put_parkdata:",ERROR_MSG.ERR_PARK_NO_UPDATE);
                    response.success(ERROR_MSG.ERR_PARK_NO_UPDATE);
                    return;
                }

                var no_hire = request.params.no_hire;

                var normal = request.params.normal;
                /*if (typeof(normal) == "undefined" || normal.length === 0) {
                  response.success(ERROR_MSG.ERR_NORMAL_MUST_EXIST);
                  return;
                  }*/

                var park_area = request.params.park_area;
                /*if (typeof(park_area) == "undefined" || park_area.length === 0) {
                  response.success(ERROR_MSG.ERR);
                  return;
                  }*/

                var park_height = request.params.park_height;
                /*if (typeof(park_height) == "undefined" || park_height.length === 0) {
                  response.success(ERROR_MSG.ERR);
                  return;
                  }*/

                var gate_card = request.params.gate_card;
                /*if (typeof(gate_card) == "undefined" || gate_card.length === 0) {
                  response.success(ERROR_MSG.ERR);
                  return;
                  }*/

                var tail_num = request.params.tail_num;

                kongcv_park_community_obj.set("city", city);
                kongcv_park_community_obj.set("address", address);
                kongcv_park_community_obj.set("hire_start", new Date(hire_start));
                kongcv_park_community_obj.set("hire_end", new Date(hire_end));
                kongcv_park_community_obj.set("no_hire", no_hire);
                kongcv_park_community_obj.set("tail_num", tail_num);
                kongcv_park_community_obj.set("location", location_info); 
                kongcv_park_community_obj.set("hire_method", hire_method);
                kongcv_park_community_obj.set("hire_price", hire_price);
                kongcv_park_community_obj.set("hire_time", hire_time);
                kongcv_park_community_obj.set("normal", normal);
                kongcv_park_community_obj.set("park_area", park_area);
                kongcv_park_community_obj.set("park_height", park_height);
                kongcv_park_community_obj.set("gate_card", gate_card);
                kongcv_park_community_obj.set("park_struct", park_struct);
                kongcv_park_community_obj.set("park_description", park_description);
                
                for (var i = 0; i < hire_method_num; i++) {
                    var price_num = hire_price_array[i].split('/')[0];
                    kongcv_park_community_obj.set(hire_field_array[i], Number(price_num));
                } 

                kongcv_park_community_obj.save().then(
                    function() {
                        response.success(RESULT_MSG.RET_OK);
                        return;
                    },
                    function(error) {
                        console.log("kongcv_put_parkdata:",error);
                        response.error(error);
                        return;
                    }
                );
            },
            error : function(error) {
                console.log("kongcv_put_parkdata:",error);
                response.error(error);
                return;
            }
        });
    }
    else if ("curb" === mode) {
        var curb_query = new AV.Query(kongcv_park_curb_cls);
        curb_query.get(park_id, {
            success : function(kongcv_park_curb_obj) {
                if (0 === kongcv_park_curb_obj.get("park_space")) {
                    console.log("kongcv_put_parkdata:",ERROR_MSG.ERR_PARK_NO_UPDATE);
                    response.success(ERROR_MSG.ERR_PARK_NO_UPDATE);
                    return;
                }

                kongcv_park_curb_obj.set("city", city);
                kongcv_park_curb_obj.set("address", address);
                kongcv_park_curb_obj.set("location", location_info);
                kongcv_park_curb_obj.set("hire_method", hire_method);
                kongcv_park_curb_obj.set("hire_price", hire_price);
                kongcv_park_curb_obj.set("hire_time", hire_time);
                kongcv_park_curb_obj.set("park_description", park_description);
                kongcv_park_curb_obj.set("park_struct", park_struct);
                
                var proxy_mobile = request.params.proxy_mobile;
                if (typeof(proxy_mobile) != "undefined" && proxy_mobile.length != 0) {
                    kongcv_park_curb_obj.set("proxy_mobile", proxy_mobile);
                }
                
                for (var i = 0; i < hire_method_num; i++) {
                    var price_num = hire_price_array[i].split('/')[0];
                    kongcv_park_curb_obj.set(hire_field_array[i], Number(price_num));
                }
                
                kongcv_park_curb_obj.save().then(
                    function() {
                        response.success(RESULT_MSG.RET_OK);
                        return;
                    },
                    function(error) {
                        console.log("kongcv_put_parkdata:",error);
                        response.error(error);
                        return;
                    }
                );
            },
            error : function(error) {
                console.log("kongcv_put_parkdata:",error);
                response.error(error);
                return;
            }
        });
    }
    else {
        console.log("kongcv_put_parkdata:",ERROR_MSG.ERR_INFO_FORMAT);
        response.success(ERROR_MSG.ERR_INFO_FORMAT);
        return;
    }
}); 
 
/**
 * brief   : insert share park data
 * @param  : request - {"user_id":"xxxxxxxxxx","address":"xxxxx",","park_detail":"xxxx","city":"xxx","location_info":{"__type": "GeoPoint","latitude":11.1,"longitude":116.4},"use_token":1}
 *           response - return result or error
 * @return : RET_OK - success
 *           {"result":"{\"state\":\"ok\",\"code\":1,\"msg\":\"成功}"}
 *           RET_ERROR - system error
 *           {"code":601,"error":"xxxxxx"}
 */
AV.Cloud.define("kongcv_insert_parkdata_share", function(request, response) {
    var user_id = request.params.user_id;
    if (typeof(user_id) == "undefined" || user_id.length === 0) {
        console.log("kongcv_insert_parkdata_share:",ERROR_MSG.ERR_USER_ID_MUST_EXIST);
        response.success(ERROR_MSG.ERR_USER_ID_MUST_EXIST);
        return;
    }

    var user_obj; 
    var use_token = request.params.use_token;
    if (typeof(use_token) != "undefined" && 1 === use_token) {
        user_obj = request.user; 
        if (typeof(user_obj) == "undefined" || user_obj.length === 0) {
            console.log("kongcv_insert_parkdata_share:",ERROR_MSG.ERR_USER_SESSIONTOKEN_MUST_EXIST);
            response.success(ERROR_MSG.ERR_USER_SESSIONTOKEN_MUST_EXIST);
            return;
        }

        if (user_id != user_obj.id) {
            console.log("kongcv_insert_parkdata_share:",ERROR_MSG.ERR_USERID_SESSIONTOKEN_UNMATCHED);
            response.success(ERROR_MSG.ERR_USERID_SESSIONTOKEN_UNMATCHED);
            return;
        }
    }
    else {
        user_obj = new user_cls();
        user_obj.id = user_id; 
    }

    var city = request.params.city;
    /*if (typeof(city) == "undefined" || city.length === 0) {
        console.log("kongcv_insert_parkdata_share:",ERROR_MSG.ERR_CITY_MUST_EXIST);
        response.success(ERROR_MSG.ERR_CITY_MUST_EXIST);
        return;
    }*/

    var address = request.params.address;
    if (typeof(address) == "undefined" || address.length === 0) {
        console.log("kongcv_insert_parkdata_share:",ERROR_MSG.ERR_ADDRESS_MUST_EXIST);
        response.success(ERROR_MSG.ERR_ADDRESS_MUST_EXIST);
        return;
    }

    var park_detail = request.params.park_detail;
    if (typeof(park_detail) == "undefined" || park_detail.length === 0) {
        console.log("kongcv_insert_parkdata_share:",ERROR_MSG.ERR_PARK_DETAIL_MUST_EXIST);
        response.success(ERROR_MSG.ERR_PARK_DETAIL_MUST_EXIST);
        return;
    }
  
    var location_info = request.params.location_info;
    if (typeof(location_info) == "undefined" || location_info.length === 0) {
        console.log("kongcv_insert_parkdata_share:",ERROR_MSG.ERR_LOCATION_INFO_MUST_EXIST);
        response.success(ERROR_MSG.ERR_LOCATION_INFO_MUST_EXIST);
        return;
    }
    if (location_info.latitude <= 0 || location_info.longitude <= 0) {
        console.log("kongcv_insert_parkdata_share:",ERROR_MSG.ERR_LOCATION_INFO_MUST_EXIST);
        response.success(ERROR_MSG.ERR_LOCATION_INFO_MUST_EXIST);
        return;
    }

    var kongcv_park_share_obj = new kongcv_park_share_cls();
    kongcv_park_share_obj.set("user", user_obj);
    kongcv_park_share_obj.set("address", address);
    kongcv_park_share_obj.set("park_detail", park_detail);
    kongcv_park_share_obj.set("location", location_info);
    if (typeof(city) != "undefined" && city.length > 0) {
        kongcv_park_share_obj.set("city", city);
    }

    kongcv_park_share_obj.save().then(
        function(park_obj) {
            var park_id = park_obj.id;
            _kongcv_search_autopush(location_info, address, park_id, "share");

            response.success(RESULT_MSG.RET_OK);
            return;
        },
        function(error) {
            console.log("kongcv_insert_parkdata_share:",error);
            response.error(error);
            return;
        }
    );
});

/**
 * brief   : put share park data
 * @param  : request - {"park_id":"xxxxxxxxxx","address":"xxxxx",","park_detail":"xxxx","city":"xxx","location_info":{"__type": "GeoPoint","latitude":11.1,"longitude":116.4},"use_token":1}
 *           response - return result or error
 * @return : RET_OK - success
 *           {"result":"{\"state\":\"ok\",\"code\":1,\"msg\":\"成功}"}
 *           RET_ERROR - system error
 *           {"code":601,"error":"xxxxxx"}
 */
AV.Cloud.define("kongcv_put_parkdata_share", function(request, response) {
    var park_id = request.params.park_id;
    if (typeof(park_id) == "undefined" || park_id.length === 0) {
        console.log("kongcv_put_parkdata_share:",ERROR_MSG.ERR_PARK_ID_MUST_EXIST);
        response.success(ERROR_MSG.ERR_PARK_ID_MUST_EXIST);
        return;
    }

    var user_obj; 
    var use_token = request.params.use_token;
    if (typeof(use_token) != "undefined" && 1 === use_token) {
        user_obj = request.user; 
        if (typeof(user_obj) == "undefined" || user_obj.length === 0) {
            console.log("kongcv_put_parkdata_share:",ERROR_MSG.ERR_USER_SESSIONTOKEN_MUST_EXIST);
            response.success(ERROR_MSG.ERR_USER_SESSIONTOKEN_MUST_EXIST);
            return;
        }
    }

    var city = request.params.city;
    /*if (typeof(city) == "undefined" || city.length === 0) {
        console.log("kongcv_insert_parkdata_share:",ERROR_MSG.ERR_CITY_MUST_EXIST);
        response.success(ERROR_MSG.ERR_CITY_MUST_EXIST);
        return;
    }*/

    var address = request.params.address;
    if (typeof(address) == "undefined" || address.length === 0) {
        console.log("kongcv_insert_parkdata_share:",ERROR_MSG.ERR_ADDRESS_MUST_EXIST);
        response.success(ERROR_MSG.ERR_ADDRESS_MUST_EXIST);
        return;
    }

    var park_detail = request.params.park_detail;
    if (typeof(park_detail) == "undefined" || park_detail.length === 0) {
        console.log("kongcv_insert_parkdata_share:",ERROR_MSG.ERR_PARK_DETAIL_MUST_EXIST);
        response.success(ERROR_MSG.ERR_PARK_DETAIL_MUST_EXIST);
        return;
    }
  
    var location_info = request.params.location_info;
    if (typeof(location_info) == "undefined" || location_info.length === 0) {
        console.log("kongcv_insert_parkdata_share:",ERROR_MSG.ERR_LOCATION_INFO_MUST_EXIST);
        response.success(ERROR_MSG.ERR_LOCATION_INFO_MUST_EXIST);
        return;
    }
    if (location_info.latitude <= 0 || location_info.longitude <= 0) {
        console.log("kongcv_insert_parkdata_share:",ERROR_MSG.ERR_LOCATION_INFO_MUST_EXIST);
        response.success(ERROR_MSG.ERR_LOCATION_INFO_MUST_EXIST);
        return;
    }

    var share_query = new AV.Query(kongcv_park_share_cls);
    share_query.get(park_id, {
        success : function(kongcv_park_share_obj) {
            kongcv_park_share_obj.set("address", address);
            kongcv_park_share_obj.set("park_detail", park_detail);
            kongcv_park_share_obj.set("location", location_info);
            if (typeof(city) != "undefined" && city.length > 0) {
                kongcv_park_share_obj.set("city", city);
            }

            kongcv_park_share_obj.save().then(
                function() {
                    response.success(RESULT_MSG.RET_OK);
                    return;
                },
                function(error) {
                    console.log("kongcv_put_parkdata_share:",error);
                    response.error(error);
                    return;
                }
            );
        },
        error : function(error) {
            console.log("kongcv_put_parkdata:",error);
            response.error(error);
            return;
        }
    });
});

/**
 * brief   : put share park repute
 * @param  : request - {"park_id":"xxxxx", "repute":"well"}
 *           response - return result or error
 * @return : RET_OK - success
 *           {"result":"{\"state\":\"ok\",\"code\":1,\"msg\":\"成功}"}
 *           RET_ERROR - system error
 *           {"code":601,"error":"xxxxxx"}
 */
AV.Cloud.define("kongcv_put_share_repute", function(request, response) {
    var park_id = request.params.park_id;
    if (typeof(park_id) == "undefined" || park_id.length === 0) {
        console.log("kongcv_put_share_repute:",ERROR_MSG.ERR_PARK_ID_MUST_EXIST);
        response.success(ERROR_MSG.ERR_PARK_ID_MUST_EXIST);
        return;
    }
    
    var repute = request.params.repute;
    if (typeof(repute) == "undefined" || repute.length === 0) {
        console.log("kongcv_put_share_repute:",ERROR_MSG.ERR_REPUTE_MUST_EXIST);
        response.success(ERROR_MSG.ERR_REPUTE_MUST_EXIST);
        return;
    }
 
    var kongcv_park_share_obj = new kongcv_park_share_cls();
    kongcv_park_share_obj.id = park_id;

    if ("well" === repute) {
        kongcv_park_share_obj.increment("well_repute");
    }
    else if ("bad" === repute) {
        kongcv_park_share_obj.increment("bad_repute");
    }
    else {
        console.log("kongcv_put_share_repute:",ERROR_MSG.ERR_INFO_FORMAT);
        response.success(ERROR_MSG.ERR_INFO_FORMAT);
    }

    kongcv_park_share_obj.set("new_repute", repute);
    
    kongcv_park_share_obj.save().then(
        function() {
            response.success(RESULT_MSG.RET_OK);
            return;
        },
        function(error) {
            console.log("kongcv_put_share_repute:",error);
            response.error(error);
            return;
        }
    );
});
 
/**
 * brief   : park transfer
 * @param  : request - {"user_id":"xxxx", "park_id":"xxxxx","transfer_mobile":"13xxxxx","mode":"curb", "use_token":1,"system":1}
 *           response - return result or error
 * @return : RET_OK - success
 *           {"result":"{\"state\":\"ok\",\"code\":1,\"msg\":\"成功}"}
 *           RET_ERROR - system error
 *           {"code":601,"error":"xxxxxx"}
 */
AV.Cloud.define("kongcv_park_transfer", function(request, response) {
    var user_id = request.params.user_id;
    if (typeof(user_id) == "undefined" || user_id.length === 0) {
        console.log("kongcv_park_transfer:",ERROR_MSG.ERR_USER_ID_MUST_EXIST);
        response.success(ERROR_MSG.ERR_USER_ID_MUST_EXIST);
        return;
    }

    var use_token = request.params.use_token;
    if (typeof(use_token) != "undefined" && 1 === use_token) {
        var user_obj = request.user; 
        if (typeof(user_obj) == "undefined" || user_obj.length === 0) {
            console.log("kongcv_park_transfer:",ERROR_MSG.ERR_USER_SESSIONTOKEN_MUST_EXIST);
            response.success(ERROR_MSG.ERR_USER_SESSIONTOKEN_MUST_EXIST);
            return;
        }

        if (user_id != user_obj.id) {
            console.log("kongcv_park_transfer:",ERROR_MSG.ERR_USERID_SESSIONTOKEN_UNMATCHED);
            response.success(ERROR_MSG.ERR_USERID_SESSIONTOKEN_UNMATCHED);
            return;
        }
    }
    
    var park_id = request.params.park_id;
    if (typeof(park_id) == "undefined" || park_id.length === 0) {
        console.log("kongcv_park_transfer:",ERROR_MSG.ERR_PARK_ID_MUST_EXIST);
        response.success(ERROR_MSG.ERR_PARK_ID_MUST_EXIST);
        return;
    }
    
    var transfer_mobile = request.params.transfer_mobile; 
    if (typeof(transfer_mobile) == "undefined" || transfer_mobile.length === 0) {
        console.log("kongcv_park_transfer:",ERROR_MSG.ERR_USER_MOBILE_MUST_EXIST);
        response.success(ERROR_MSG.ERR_USER_MOBILE_MUST_EXIST);
        return;
    }

    var mode = request.params.mode;
    if (typeof(mode) == "undefined" || mode.length === 0) {
        console.log("kongcv_park_transfer:",ERROR_MSG.ERR_MODE_MUST_EXIST);
        response.success(ERROR_MSG.ERR_MODE_MUST_EXIST);
        return;
    }

    if ("curb" === mode) {
        var curb_query = new AV.Query(kongcv_park_curb_cls);
        curb_query.get(park_id, {
            success : function(kongcv_park_curb_obj) {
                if (0 === kongcv_park_curb_obj.get("park_space")) {
                    console.log("kongcv_park_transfer:",ERROR_MSG.ERR_PARK_NO_UPDATE);
                    response.success(ERROR_MSG.ERR_PARK_NO_UPDATE);
                    return;
                }

                AV.User.logIn(user_0, user_0_ps, {
                    success :function(user_admin) { 
                        var user_query = new AV.Query(AV.User); 
                        user_query.equalTo("mobilePhoneNumber", transfer_mobile);
                        user_query.find({
                            success : function(results) {
                                if (0 === results.length) {
                                    console.log("kongcv_park_transfer:",ERROR_MSG.ERR_USER_NO_SIGNUP);
                                    response.success(ERROR_MSG.ERR_USER_NO_SIGNUP);
                                    return;
                                }

                                var user_obj = results[0];
                                //var user_obj = new user_cls();
                                //user_obj.id = user.id;

                                //var user_array = [];
                                //user_array.push(user_obj);
                                //kongcv_park_obj.set("user_group", user_array);
                                var system = request.params.system;
                                if (typeof(system) == "undefined" || system.length === 0) {
                                    var old_user = kongcv_park_curb_obj.get("user");
                                    var old_user_id = old_user.id;
                                    if (user_id != old_user_id) {
                                        console.log("kongcv_park_transfer:",ERROR_MSG.ERR_NO_AUTH);
                                        response.success(ERROR_MSG.ERR_NO_AUTH);
                                        return;
                                    }
                                }
                                
                                kongcv_park_curb_obj.set("user", user_obj);
                                kongcv_park_curb_obj.save().then(
                                    function() {
                                        response.success(RESULT_MSG.RET_OK);
                                        return;
                                    },
                                    function(error) {
                                        console.log("kongcv_park_transfer:",error);
                                        response.error(error);
                                        return;
                                    }
                                );
                            },
                            error : function(error) {
                                console.log("kongcv_park_transfer:",error);
                                response.error(error);
                                return;
                            }
                        });
                    },
                    error : function(error) {
                        console.log("kongcv_park_transfer:",error);
                        response.error(error);
                        return;
                    }
                });
            },
            error : function(error) {
                console.log("kongcv_park_transfer:",error);
                response.error(error);
                return;
            }
        });
    }
    else {
        console.log("kongcv_park_transfer:",ERROR_MSG.ERR_INFO_FORMAT);
        response.success(ERROR_MSG.ERR_INFO_FORMAT);
        return;
    }
});

/**
 * brief   : get park month trade list
 * @param  : request - {"park_id":"xxxxx", "query_month":"2015-12-01 00:00:00", "skip":0, "limit":10,"mode":"community", "pay_state":0}
 *           response - return result or error
 * @return : RET_OK - success
 *           {"result":"{\"state\":\"ok\",\"code\":1,\"msg\":\"成功}"}
 *           RET_ERROR - system error
 *           {"code":601,"error":"xxxxxx"}
 */
AV.Cloud.define("kongcv_get_park_date_list", function(request, response) {
    var park_id = request.params.park_id;
    if (typeof(park_id) == "undefined" || park_id.length === 0) {
        console.log("kongcv_get_park_date_list:",ERROR_MSG.ERR_PARK_ID_MUST_EXIST);
        response.success(ERROR_MSG.ERR_PARK_ID_MUST_EXIST);
        return;
    }
 
    var query_month = new Date(request.params.query_month);
    if (typeof(query_month) == "undefined" || query_month.length === 0) {
        console.log("kongcv_get_park_date_list:",ERROR_MSG.ERR_QUERY_DATE_MUST_EXIST);
        response.success(ERROR_MSG.ERR_QUERY_DATE_MUST_EXIST);
        return;
    }

    var skip = request.params.skip;
    if (typeof(skip) == "undefined" || skip.length === 0) {
        console.log("kongcv_get_park_date_list:",ERROR_MSG.ERR_SKIP_MUST_EXIST);
        response.success(ERROR_MSG.ERR_SKIP_MUST_EXIST);
        return;
    }
    
    var limit = request.params.limit;
    if (typeof(limit) == "undefined" || limit.length === 0) {
        console.log("kongcv_get_park_date_list:",ERROR_MSG.ERR_LIMIT_MUST_EXIST);
        response.success(ERROR_MSG.ERR_LIMIT_MUST_EXIST);
        return;
    }

    var mode = request.params.mode;
    if (typeof(mode) == "undefined" || mode.length === 0) {
        console.log("kongcv_get_park_date_list:",ERROR_MSG.ERR_MODE_MUST_EXIST);
        response.success(ERROR_MSG.ERR_MODE_MUST_EXIST);
        return;
    }

    var pay_state = request.params.pay_state;
    if (typeof(pay_state) == "undefined" || pay_state.length === 0) {
        console.log("kongcv_get_park_date_list:",ERROR_MSG.ERR_PAY_STATE_MUST_EXIST);
        response.success(ERROR_MSG.ERR_PAY_STATE_MUST_EXIST);
        return;
    }

    var month = new Date(request.params.query_month);
    var next_month = new Date(month.setMonth(month.getMonth() + 1));

    var kongcv_park_obj;
    if ("community" === mode) {
        kongcv_park_obj = new kongcv_park_community_cls();
        kongcv_park_obj.id = park_id;
    }
    else if ("curb" === mode) {
        kongcv_park_obj = new kongcv_park_curb_cls();
        kongcv_park_obj.id = park_id;
    }
    else {
        console.log("kongcv_get_park_date_list:",ERROR_MSG.ERR_INFO_FORMAT);
        response.success(ERROR_MSG.ERR_INFO_FORMAT);
        return;
    }

    var trade_query = new AV.Query(kongcv_trade_cls);
    if ("community" === mode) {
        trade_query.equalTo("park_community", kongcv_park_obj);
    }
    else if ("curb" === mode) {
        trade_query.equalTo("park_curb", kongcv_park_obj);
    }
   
    if (1 === pay_state) {
      trade_query.greaterThanOrEqualTo("pay_state", 1);
      //trade_query.EqualTo("trade_state", 1);
    }
    trade_query.greaterThanOrEqualTo("hire_end", query_month);
    trade_query.lessThan("hire_start", next_month);
    trade_query.descending("createdAt");
    trade_query.skip(skip);
    trade_query.limit(limit);
    trade_query.find({
        success : function(results) {
            response.success(results);
        },
        error : function(error) {
            console.log("kongcv_get_park_date_list:",error);
            response.error(error);
            return;
        }
    });
});

/**
 * brief   : get month trade list
 * @param  : request - {"user_id":"xxxxx", "query_month":"2015-12-01 00:00:00", "role":"customer","skip":0, "limit":10,"mode":"community", "pay_state":0,"use_token":1}
 *           response - return result or error
 * @return : RET_OK - success
 *           {"result":"{\"state\":\"ok\",\"code\":1,\"msg\":\"成功}"}
 *           RET_ERROR - system error
 *           {"code":601,"error":"xxxxxx"}
 */
AV.Cloud.define("kongcv_get_trade_date_list", function(request, response) {
    var user_id = request.params.user_id;
    if (typeof(user_id) == "undefined" || user_id.length === 0) {
        console.log("kongcv_get_trade_date_list:",ERROR_MSG.ERR_USER_ID_MUST_EXIST);
        response.success(ERROR_MSG.ERR_USER_ID_MUST_EXIST);
        return;
    }
 
    var user_obj;
    var use_token = request.params.use_token;
    if (typeof(use_token) != "undefined" && 1 === use_token) {
        user_obj = request.user;
        if (typeof(user_obj) == "undefined" || user_obj.length === 0) {
            console.log("kongcv_get_trade_date_list:",ERROR_MSG.ERR_USER_SESSIONTOKEN_MUST_EXIST);
            response.success(ERROR_MSG.ERR_USER_SESSIONTOKEN_MUST_EXIST);
            return;
        }

        if (user_id != user_obj.id) {
            console.log("kongcv_get_trade_date_list:",ERROR_MSG.ERR_USERID_SESSIONTOKEN_UNMATCHED);
            response.success(ERROR_MSG.ERR_USERID_SESSIONTOKEN_UNMATCHED);
            return;
        }
    }
    else { 
        user_obj = new user_cls();
        user_obj.id = user_id;
    }

    var role = request.params.role;
    if (typeof(role) == "undefined" || role.length === 0) {
        console.log("kongcv_get_trade_date_list:",ERROR_MSG.ERR_USER_SESSIONTOKEN_MUST_EXIST);
        response.success(ERROR_MSG.ERR_ROLE_MUST_EXIST);
        return;
    }

    var query_month = new Date(request.params.query_month);
    if (typeof(query_month) == "undefined" || query_month.length === 0) {
        console.log("kongcv_get_trade_date_list:",ERROR_MSG.ERR_QUERY_DATE_MUST_EXIST);
        response.success(ERROR_MSG.ERR_QUERY_DATE_MUST_EXIST);
        return;
    }

    var skip = request.params.skip;
    if (typeof(skip) == "undefined" || skip.length === 0) {
        console.log("kongcv_get_trade_date_list:",ERROR_MSG.ERR_SKIP_MUST_EXIST);
        response.success(ERROR_MSG.ERR_SKIP_MUST_EXIST);
        return;
    }
    
    var limit = request.params.limit;
    if (typeof(limit) == "undefined" || limit.length === 0) {
        console.log("kongcv_get_trade_date_list:",ERROR_MSG.ERR_LIMIT_MUST_EXIST);
        response.success(ERROR_MSG.ERR_LIMIT_MUST_EXIST);
        return;
    }

    var mode = request.params.mode;
    if (typeof(mode) == "undefined" || mode.length === 0) {
        console.log("kongcv_get_trade_date_list:",ERROR_MSG.ERR_MODE_MUST_EXIST);
        response.success(ERROR_MSG.ERR_MODE_MUST_EXIST);
        return;
    }

    var pay_state = request.params.pay_state;
    if (typeof(pay_state) == "undefined" || pay_state.length === 0) {
        console.log("kongcv_get_trade_date_list:",ERROR_MSG.ERR_PAY_STATE_MUST_EXIST);
        response.success(ERROR_MSG.ERR_PAY_STATE_MUST_EXIST);
        return;
    }

    
    var month = new Date(request.params.query_month);
    var next_month = new Date(month.setMonth(month.getMonth() + 1));

    var kongcv_park_cls;
    var trade_query = new AV.Query(kongcv_trade_cls);
    if ("community" === mode) {
        trade_query.exists("park_community");
        trade_query.include("park_community");
        kongcv_park_cls = kongcv_park_community_cls;
    }
    else if ("curb" === mode) {
        trade_query.exists("park_curb");
        trade_query.include("park_curb");
        kongcv_park_cls = kongcv_park_curb_cls;
    }
    else {
        console.log("kongcv_get_trade_date_list:",ERROR_MSG.ERR_INFO_FORMAT);
        response.success(ERROR_MSG.ERR_INFO_FORMAT);
        return;
    }
   
   if ("customer" === role) {
        trade_query.equalTo("user", user_obj);
    }
    else if ("hirer" === role) {
        trade_query.equalTo("hirer", user_obj);
    }
    else if ("hirer_second" === role) {
        var park_query = new AV.Query(kongcv_park_cls); 
        park_query.equalTo("user_group", user_obj);

        if ("community" === mode) {
            trade_query.matchesQuery("park_community", park_query);
        }
        else if ("curb" === mode) {
            trade_query.matchesQuery("park_curb", park_query);
        }  
    }
    else {
        console.log("kongcv_get_trade_date_list:",ERROR_MSG.ERR_INFO_FORMAT);
        response.success(ERROR_MSG.ERR_INFO_FORMAT);
        return;
    }
    
    if (1 === pay_state) {
      trade_query.greaterThanOrEqualTo("pay_state", 1);
    }
    trade_query.greaterThanOrEqualTo("hire_start", query_month);
    trade_query.lessThan("hire_start", next_month);
    trade_query.descending("createdAt");
    trade_query.skip(skip);
    trade_query.limit(limit);
    trade_query.select("-charge_date");
    trade_query.select("-trade_bill_id");
    
    trade_query.find({
        success : function(results) {
            for (var i = 0; i < results.length; i++) {
                /*if ("customer" === role) {
                    if ("community" === mode) {
                        results[i].set("park_community", JSON.stringify(results[i].get("park_community")));
                    }
                    else if ("curb" === mode) {
                        results[i].set("park_curb", JSON.stringify(results[i].get("park_curb")));
                    }
                }
                else if ("hirer" === role) {
                    results[i].set("user", JSON.stringify(results[i].get("user")));
                }
                else if ("hirer_second" === role) { 
                    results[i].set("user", JSON.stringify(results[i].get("user")));
                }*/
                
                if ("community" === mode) {
                    results[i].set("park_community", JSON.stringify(results[i].get("park_community")));
                }
                else if ("curb" === mode) {
                    results[i].set("park_curb", JSON.stringify(results[i].get("park_curb")));
                }
            }

            response.success(results);
            return;
        },
        error : function(error) {
            console.log("kongcv_get_trade_date_list:",error);
            response.error(error);
            return;
        }
    });
});
 
/**
 * brief   : insert trade bill data
 * @param  : request - {"trade_id":"xxxxx"}
 *           response - return result or error
 * @return : RET_OK - success
 *           {"result":"{\"state\":\"ok\",\"code\":1,\"msg\":\"成功}"}
 *           RET_ERROR - system error
 *           {"code":601,"error":"xxxxxx"}
 */
AV.Cloud.define("kongcv_insert_trade_billdata", function(request, response) {
    var trade_id = request.params.trade_id;
    if (typeof(trade_id) == "undefined" || trade_id.length === 0) {
        console.log("kongcv_insert_trade_billdata:",ERROR_MSG.ERR_TRADE_ID_MUST_EXIST);
        response.success(ERROR_MSG.ERR_TRADE_ID_MUST_EXIST);
        return;
    }

    var kongcv_trade_obj = new kongcv_trade_cls();
    kongcv_trade_obj.id = trade_id;
    
    var kongcv_trade_bill_obj = new kongcv_trade_bill_cls();
    kongcv_trade_bill_obj.set("trade", kongcv_trade_obj);
    kongcv_trade_bill_obj.save().then(
        function(bill_obj) {
            var bill_id = bill_obj.id;
            var trade_query = new AV.Query(kongcv_trade_cls);
            trade_query.get(trade_id, {
                success : function(trade_obj) {
                    trade_obj.add("trade_bill_id", bill_id);

                    trade_obj.save().then(
                        function(result) {
                            var json_obj = eval("("+RESULT_MSG.RET_OK+")");
                            json_obj["bill_id"] = bill_id;
                            response.success(JSON.stringify(json_obj));
                            return;
                        },
                        function(error) {
                            console.log("kongcv_insert_trade_billdata:",error);
                            response.error(error);
                            return;
                        }
                    );
                },
                error : function(error) {
                    console.log("kongcv_insert_trade_billdata:",error);
                    response.error(error);
                    return;
                }
            });
        },
        function(error) {
            console.log("kongcv_insert_trade_billdata:",error);
            response.error(error);
            return;
        }
    );
});

/**
 * brief   : put trade bill (test function,release must closed)
 * @param  : request - {"bill_id":"xxxxx","money":100,"pay_tool":"alipay","pay_id":"xxxx","notify_id":"xxxx","coupon":0,"pay_type":"xxxx","mode":"community"}
 *           response - return result or error
 * @return : RET_OK - success
 *           {"result":"{\"state\":\"ok\",\"code\":1,\"msg\":\"成功}"}
 *           RET_ERROR - system error
 *           {"code":601,"error":"xxxxxx"}
 */
AV.Cloud.define("kongcv_put_trade_billdata", function(request, response) {
    console.log("invoke put trade_billdata");

    console.log("trade_billdata:", request);

    var bill_id = request.params.bill_id;
    if (typeof(bill_id) == "undefined" || bill_id.length === 0) {
        console.log("kongcv_put_trade_billdata:", ERROR_MSG.ERR_BILL_ID_MUST_EXIST);
        response.error(ERROR_MSG.ERR_BILL_ID_MUST_EXIST);
    }

    var money = request.params.money;
    if (typeof(money) == "undefined" || money.length === 0) {
        console.log("kongcv_put_trade_billdata:", ERROR_MSG.ERR_MONEY_MUST_EXIST);
        response.error(ERROR_MSG.ERR_MONEY_MUST_EXIST);
    }

    var pay_tool = request.params.pay_tool;
    if (typeof(pay_tool) == "undefined" || pay_tool.length === 0) {
        console.log("kongcv_put_trade_billdata:",ERROR_MSG.ERR_PAY_TOOL_MUST_EXIST);
        response.error(ERROR_MSG.ERR_PAY_TOOL_MUST_EXIST);
    }

    var pay_id = request.params.pay_id;
    if (typeof(pay_id) == "undefined" || pay_id.length === 0) {
        console.log("kongcv_put_trade_billdata:", ERROR_MSG.ERR_PAY_ID_MUST_EXIST);
        response.error(ERROR_MSG.ERR_PAY_ID_MUST_EXIST);
    }

    var notify_id = request.params.notify_id;
    if (typeof(notify_id) == "undefined" || notify_id.length === 0) {
        console.log("kongcv_put_trade_billdata:", ERROR_MSG.ERR_NOTIFY_ID_MUST_EXIST);
        response.error(ERROR_MSG.ERR_NOTIFY_ID_MUST_EXIST);
    }

    var pay_type = request.params.pay_type;
    if (typeof(pay_type) == "undefined" || pay_type.length === 0) {
        console.log("kongcv_put_trade_billdata:", ERROR_MSG.ERR_PAY_TYPE_MUST_EXIST);
        response.error(ERROR_MSG.ERR_PAY_TYPE_MUST_EXIST);
    }
    
    var mode = request.params.mode;
    if (typeof(mode) == "undefined" || mode.length === 0) {
        console.log("kongcv_put_trade_billdata:", ERROR_MSG.ERR_MODE_MUST_EXIST);
        response.error(ERROR_MSG.ERR_MODE_MUST_EXIST);
    }
    if ("cb" === mode) {
        console.log("mode change:", mode);
        mode = "curb";
    }
    if ("cm" === mode) {
        console.log("mode change:", mode);
        mode = "community";
    }

    console.log("trade_billdata:", 1);

    var coupon = request.params.coupon;
    var coupon_id = request.params.coupon_id;

    var kongcv_trade_bill_obj = new kongcv_trade_bill_cls();
    kongcv_trade_bill_obj.id = bill_id;
    
    var bill_query = new AV.Query(kongcv_trade_bill_cls);
    bill_query.include("trade.property");
    bill_query.get(bill_id, {
        success : function(bill_obj) {
            console.log("trade_billdata:", 2);
            var trade_obj = bill_obj.get("trade");
            var trade_coupon = trade_obj.get("coupon");
            var trade_pay_tool = trade_obj.get("pay_tool");
            var trade_handsel_state = trade_obj.get("handsel_state");
            var trade_state = trade_obj.get("trade_state");
            console.log("trade_state:", trade_state);

            if (typeof(trade_state) != "undefined") {
                if (1 === trade_state) {
                    console.log("kongcv_put_trade_billdata:", ERROR_MSG.ERR_PAY_TRADE_FINISH);
                    return;
                }
            }
            else {
                console.log("kongcv_put_trade_billdata 1",ERROR_MSG.ERR_SYSTEM_TRADE);
            }

            if (typeof(trade_handsel_state) != "undefined") {
                if (1 === trade_handsel_state) {
                    if ("handsel" === pay_type) {
                        console.log("kongcv_put_trade_billdata:", ERROR_MSG.ERR_PAY_TYPE_FORMAT);
                    }
                }
            }
            else {
                console.log("kongcv_put_trade_billdata 2",ERROR_MSG.ERR_SYSTEM_TRADE);
            }

            if (typeof(coupon) != "undefined") {
                if (coupon > 0) {
                    if (trade_coupon > 0) {
                        console.log("kongcv_put_trade_billdata:", ERROR_MSG.ERR_COUPON_ONLY_ONE);
                    }
                        
                    trade_obj.set("coupon", coupon);
                    money += coupon;
                }
                
                if (typeof(coupon_id) != "undefined" && coupon_id.length > 0) {
                    //_kongcv_remove_coupon(coupon_id, bill_id, request);
                }
            }
            else {
                console.log("kongcv_put_trade_billdata 3",ERROR_MSG.ERR_SYSTEM_TRADE);
            }

            if (typeof(trade_pay_tool) != "undefined" && trade_pay_tool.length > 0) {
                var pay_tool_perfix = pay_tool.split("_");
                var trade_pay_tool_perfix = trade_pay_tool.split("_");
                if (pay_tool_perfix[0] != trade_pay_tool_perfix[0]) {
                    console.log("kongcv_put_trade_billdata", ERROR_MSG.ERR_PAY_TOOL_MUST_SAME);
                }
            }

            console.log("trade_billdata:", 3);
            bill_obj.set("money", money);
            bill_obj.set("pay_tool", pay_tool);
            bill_obj.set("pay_id", pay_id);
            bill_obj.set("notify_id", notify_id);
            bill_obj.set("pay_type", pay_type);
            bill_obj.set("pay_state", 1);
            if (typeof(coupon) != "undefined" && coupon > 0) {
                bill_obj.set("coupon", coupon);
            }

            bill_obj.save().then(
                function(result) { 
                    console.log("trade_billdata:", 4);
                    if ("money" === pay_type) { 
                        trade_obj.set("pay_tool", pay_tool);
                        trade_obj.set("money", money);
                        trade_obj.set("pay_state", 2);
                        trade_obj.set("trade_state", 1);
                    }
                    else if ("handsel" === pay_type) {
                        trade_obj.set("pay_tool", pay_tool);
                        trade_obj.set("money", money);
                        trade_obj.set("handsel", money);
                        trade_obj.set("pay_state", 1);
                        trade_obj.set("handsel_state", 1);
                    }
                    else if ("balance" === pay_type) {
                        trade_obj.increment("money", money);
                        trade_obj.set("balance", money);
                        trade_obj.set("pay_state", 2);
                        trade_obj.set("trade_state", 1);
                    }

                    trade_obj.save().then(
                        function(trade_obj) {
                            console.log("trade save");
                            var purse_query = new AV.Query(kongcv_purse_cls);
                            var trade_money = trade_obj.get("money");
                            var verify_trade_money = trade_obj.get("money");
                            var verify_trade_price = trade_obj.get("price");
                            
                            if ("money" === pay_type || "balance" === pay_type) { 
                                if (verify_trade_money != verify_trade_price) {
                                    console.log("kongcv_put_trade_billdata:", "verify_price");
                                }
                            }
                        
                            if ("money" === pay_type && "community" === mode) {
                                var park_obj = trade_obj.get("park_community");
                                if (typeof(park_obj) != "undefined") {
                                    park_obj.set("park_space", 0);
                                }

                                park_obj.save().then(
                                    function(park_obj) { 
                                    },
                                    function(error) {
                                        console.log("kongcv_put_trade_billdata:", "park_save" + error);
                                    }
                                );
                            }
                            else if ("balance" === pay_type && "curb" === mode) {
                                var curb_rate = trade_obj.get("curb_rate");
                                var hirer_obj = trade_obj.get("hirer");
                                var user_obj = trade_obj.get("user");

                                purse_query.equalTo("user", hirer_obj);
                                purse_query.limit(1);
                                purse_query.find({
                                    success : function(results) {
                                        var hirer_purse_obj;
                                
                                        if (1 === results.length) {
                                            hirer_purse_obj = results[0];
                                        }
                                        else if (0 === results.length) {
                                            hirer_purse_obj = new kongcv_purse_cls();
                                            hirer_purse_obj.set("user", hirer_obj);
                                        }

                                        var own_trade_money;
                                        var own_rate;

                                        if (curb_rate > 0) {
                                            own_rate = curb_rate;
                                        }
                                        else {
                                            own_rate = kongcv_rate;
                                        }

                                        own_trade_money = trade_money * own_rate; 
                                        if (own_trade_money > limit_price) {
                                            own_trade_money = parseInt(own_trade_money);
                                        }
                                        else {
                                            own_trade_money = Number(own_trade_money.toFixed(2));
                                        }
                                        hirer_purse_obj.increment("amount", own_trade_money);
                                        hirer_purse_obj.increment("money", own_trade_money);

                                        hirer_purse_obj.save().then(
                                            function(hirer_purse_obj) {
                                            },
                                            function(error) {
                                                console.log("kongcv_put_trade_billdata:", "hirer_purse_save" + error);
                                            }
                                        );
                                    },
                                    error : function(error) {
                                        console.log("kongcv_put_trade_billdata:", "hirer_purse_query" + error);
                                    }
                                }); 
                            }
                           
                            console.log("expense start");
                            if ("handsel" != pay_type) {
                                purse_query.equalTo("user", user_obj);
                                purse_query.limit(1);
                                purse_query.find({
                                    success : function(results) {
                                        var user_purse_obj;

                                        if (1 === results.length) {
                                            user_purse_obj = results[0];
                                        }
                                        else if (0 === results.length) {
                                            user_purse_obj = new kongcv_purse_cls();
                                            user_purse_obj.set("user", user_obj);
                                        }

                                        user_purse_obj.increment("expense", trade_money);

                                        user_purse_obj.save().then(
                                            function(user_purse_obj) {
                                                console.log("expense save");
                                            },
                                            function(error) {
                                                console.log("kongcv_put_trade_billdata:", "user_purse_save" + error);
                                            }
                                        );
                                    },
                                    error : function(error) {
                                        console.log("kongcv_put_trade_billdata:", "user_purse_query" + error);
                                    }
                                });
                            }
                        },
                        function(error) {
                            console.log("kongcv_put_trade_billdata:", "trade_save" + error);
                        }
                    );
                },
                function(error) {
                    console.log("kongcv_put_trade_billdata:", "bill_save" + error);
                }
            );
        },
        error : function(error) {
            console.log("kongcv_put_trade_billdata:", "bill_query" + error);
        }
    });
});

/**
 * brief   : loop trade bill
 * @param  : request - {"current_date":"2015-12-01", "skip":0, "limit":10}
 *           response - return result or error
 * @return : RET_OK - success
 *           {"result":"{\"state\":\"ok\",\"code\":1,\"msg\":\"成功}"}
 *           RET_ERROR - system error
 *           {"code":601,"error":"xxxxxx"}
 */
var _kongcv_insert_loop_trade_log = function(trade_obj, date, repeat, log) {
    var kongcv_loop_trade_obj = new kongcv_loop_trade_cls();
    
    kongcv_loop_trade_obj.set("trade", trade_obj);
    kongcv_loop_trade_obj.set("date", date);
    kongcv_loop_trade_obj.set("repeat", repeat);
    kongcv_loop_trade_obj.add("log", log);
    kongcv_loop_trade_obj.save();
};

var _kongcv_jpush_message_p2p = function(mobile, device_token, device_type, push_info, extras) {
    var device_notify;
   
    if ("ios" === device_type) {
        device_notify = JPush.ios(push_info, 'happy', 1, true, extras);
    }
    else if ("android" === device_type) {
        device_notify = JPush.android(push_info, null, 1, extras);
    }
    else {
        console.log("_kongcv_jpush_message_p2p:",ERROR_MSG.ERR_INFO_FORMAT);
        return;
    }

    JPush_client.push().setPlatform(device_type)
    .setAudience(JPush.registration_id(device_token))
    .setNotification('Hi, Kongcv', device_notify)
    .setOptions(868686, 864000, null, JPush_production)
    .send(function(err, res) {
        if (err) {
            if (err instanceof JPush.APIConnectionError) {
                console.log("_kongcv_jpush_message_p2p:",err);
            } 
            else if (err instanceof  JPush.APIRequestError) {
                console.log("_kongcv_jpush_message_p2p:",err);
            }
        } 
        else {
            console.log("_kongcv_jpush_message_p2p:","push ok");
        }
    });
};

var _purse_charge = function(trade_obj, hirer_obj, average_money, date, num) {
    var purse_query = new AV.Query(kongcv_purse_cls);

    purse_query.equalTo("user", hirer_obj);
    purse_query.limit(1);
    purse_query.find({
        success : function(results) {
            var purse_obj;
            if (1 === results.length) {
                purse_obj = results[0];
            }
            else if (0 === results.length) {
                purse_obj = new kongcv_purse_cls();
                purse_obj.set("user", hirer_obj);
            }

            var property_rate;
            var own_rate;

            var park_community_obj = trade_obj.get("park_community");
            var park_curb_obj = trade_obj.get("park_curb");
            
            if (park_community_obj != undefined) {
                var trade_property_obj = trade_obj.get("property");
                if (trade_property_obj != undefined) {
                    property_rate = trade_property_obj.get("rate");
                    own_rate = kongcv_rate - property_rate;

                    var property_user_obj = trade_property_obj.get("user");
                    var property_purse_query = new AV.Query(kongcv_purse_cls);
                    property_purse_query.equalTo("user", property_user_obj);
                    property_purse_query.limit(1);
                    property_purse_query.find({
                        success : function(results) {
                            var property_purse_obj;

                            if (1 === results.length) {
                                property_purse_obj = results[0];
                            }
                            else if (0 === results.length) {
                                property_purse_obj = new kongcv_purse_cls();
                                property_purse_obj.set("user", property_user_obj);
                            }

                            var property_average_money = average_money * property_rate;
                            if (property_average_money > limit_price) {
                                property_average_money = parseInt(property_average_money);
                            }
                            else {
                                property_average_money = Number(property_average_money.toFixed(2));
                            }
                            
                            var tmp_property_purse_amount = property_purse_obj.get("amount");
                            var tmp_property_purse_money = property_purse_obj.get("money");
                            var tmp_new_property_purse_amount = tmp_property_purse_amount + property_average_money;
                            var tmp_new_property_purse_money = tmp_property_purse_money + property_average_money;
                            property_purse_obj.set("amount", Number(tmp_new_property_purse_amount.toFixed(2))); 
                            property_purse_obj.set("money", Number(tmp_new_property_purse_money.toFixed(2))); 
                            //property_purse_obj.increment("amount", property_average_money);
                            //property_purse_obj.increment("money", property_average_money);

                            property_purse_obj.save().then(
                                function(purse_obj) {
                                    var mobile  = property_user_obj.get('mobilePhoneNumber');
                                    var device_token = property_user_obj.get('device_token');
                                    var device_type = property_user_obj.get('device_type');

                                    if (mobile != undefined && device_token != undefined && device_type != undefined) {
                                        var extras = {'push_type':'purse_charge'};
                                        var push_info = PUSH_INFO.PURSE_CHARGE;
                                        var price_info = property_average_money + "元";
                                        push_info += price_info;
                                        _kongcv_jpush_message_p2p(mobile, device_token, device_type, push_info, extras);
                                        _kongcv_sms_push(mobile, "purse_charge", property_average_money, "", "");
                                    }
                                },
                                function(error) {
                                    _kongcv_insert_loop_trade_log(trade_obj, date, 0, "property_purse_save" + error);
                                }
                            );
                        },
                        error : function(error) {
                            _kongcv_insert_loop_trade_log(trade_obj, date, 0, "property_purse_query" + error);
                        }
                    });
                }
                else {
                    own_rate = kongcv_rate;
                }
            }
            else if (park_curb_obj != undefined) {
                var curb_rate = trade_obj.get("curb_rate");
                if (curb_rate > 0) {
                    own_rate = curb_rate;
                }
                else {
                    own_rate = kongcv_rate;
                }
            }

            var own_average_money = average_money * own_rate;
            if (own_average_money > limit_price) {
                own_average_money = parseInt(own_average_money);
            }
            else {
                own_average_money = Number(own_average_money.toFixed(2));
            }
            
            var tmp_purse_amount = purse_obj.get("amount");
            var tmp_purse_money = purse_obj.get("money");
            var tmp_new_purse_amount = tmp_purse_amount + own_average_money;
            var tmp_new_purse_money = tmp_purse_money + own_average_money;
            purse_obj.set("amount", Number(tmp_new_purse_amount.toFixed(2)));
            purse_obj.set("money", Number(tmp_new_purse_money.toFixed(2)));
            //purse_obj.increment("amount", own_average_money);
            //purse_obj.increment("money", own_average_money);

            purse_obj.save().then(
                function(purse_obj) {
                    var mobile  = hirer_obj.get('mobilePhoneNumber');
                    var device_token = hirer_obj.get('device_token');
                    var device_type = hirer_obj.get('device_type');

                    if (mobile != undefined && device_token != undefined && device_type != undefined) {
                        var extras = {'push_type':'purse_charge'};
                        var push_info = PUSH_INFO.PURSE_CHARGE;
                        var price_info = own_average_money + "元";
                        push_info += price_info;
                        _kongcv_jpush_message_p2p(mobile, device_token, device_type, push_info, extras);
                        _kongcv_sms_push(mobile, "purse_charge", own_average_money, "", "");
                    }
                },
                function(error) { 
                    _kongcv_insert_loop_trade_log(trade_obj, date, 0, "purse_save" + error);
                }
            );
        },
        error : function(error) {
            _kongcv_insert_loop_trade_log(trade_obj, date, 0, "purse_query" + error);
        }
    });
};

var _loop_trade_charge = function(request, response) {
    var current_date = request.params.current_date;
    if (typeof(current_date) == "undefined" || current_date.length === 0) {
        console.log("_loop_trade_charge:",ERROR_MSG.ERR_QUERY_DATE_MUST_EXIST);
        response.success(ERROR_MSG.ERR_QUERY_DATE_MUST_EXIST);
        return;
    }
    
    var skip = request.params.skip;
    if (typeof(skip) == "undefined" || skip.length === 0) {
        console.log("_loop_trade_charge:",ERROR_MSG.ERR_SKIP_MUST_EXIST);
        response.success(ERROR_MSG.ERR_SKIP_MUST_EXIST);
        return;
    }
    
    var limit = request.params.limit;
    if (typeof(limit) == "undefined" || limit.length === 0) {
        console.log("_loop_trade_charge:",ERROR_MSG.ERR_LIMIT_MUST_EXIST);
        response.success(ERROR_MSG.ERR_LIMIT_MUST_EXIST);
        return;
    }

    var trade_query = new AV.Query(kongcv_trade_cls);
    trade_query.skip(skip);
    trade_query.limit(limit);
    trade_query.equalTo("extra_flag", "1");
    trade_query.equalTo("charge_date", current_date);
    trade_query.equalTo("trade_state", 1);
    trade_query.equalTo("action", 0);
    //trade_query.exists("park_community");
    trade_query.include("property.user");
    trade_query.include("hirer");

    trade_query.find({
        success : function(results) {
            if (0 === results.length) {
                console.log("_loop_trade_charge:",RESULT_MSG.RET_FAIL);
                //response.success(RESULT_MSG.RET_FAIL);
                response.success("no_results");
                return;
            }

            for (var i = 0; i < results.length; i++) {
                var trade_obj = results[i];
                var charge_date = trade_obj.get("charge_date");
                var charge_date_len = charge_date.length;
                var hirer_obj = trade_obj.get("hirer");
                var money = trade_obj.get("money");
                var charge_num = trade_obj.get("charge_num");
                var average_money = parseInt(money / charge_date_len);
                var remainder_money = money % charge_date_len;
                var is_purse_charge = true;
                
                for (var j = 0; j < charge_date_len; j++) {
                    if (current_date === charge_date[j] && j === charge_date_len - 1) {
                        average_money += remainder_money;
                        
                        var park_obj = trade_obj.get("park_community");
                        if (typeof(park_obj) != "undefined") {
                            park_obj.set("park_space", 1);
                            park_obj.save();
                        }
                    }
                    if (current_date === charge_date[j]) {
                        if (charge_num === j) {
                            trade_obj.increment("charge_num");
                            trade_obj.save();
                        }
                        else {
                            console.log("_loop_trade_charge:",ERROR_MSG.ERR_LOOP_REPEAT);
                            _kongcv_insert_loop_trade_log(trade_obj, current_date, 1, ERROR_MSG.ERR_LOOP_REPEAT);

                            is_purse_charge = false; 
                            //response.success(ERROR_MSG.ERR_LOOP_REPEAT);
                            //return;
                        }
                    }
                }
               
               if (is_purse_charge) {
                    _purse_charge(trade_obj, hirer_obj, average_money, current_date, 0);
               }
            }

            response.success("ok");
            return;
        },
        error : function(error) {
            console.log("_loop_trade_charge:",ERROR_MSG.ERR_LOOP);
            response.success("error");
            return;
        }
    });
};

AV.Cloud.define("kongcv_loop_trade", function(request, response) {
    return _loop_trade_charge(request, response);
}); 

/**
 * brief   : loop trade bill
 * @param  : request - {"current_date":"2015-12-01", "skip":0, "limit":10}
 *           response - return result or error
 * @return : RET_OK - success
 *           {"result":"{\"state\":\"ok\",\"code\":1,\"msg\":\"成功}"}
 *           RET_ERROR - system error
 *           {"code":601,"error":"xxxxxx"}
 */
var _invite_code_handle = function(invite_code_obj) {
    var user_obj = invite_code_obj.get("user");
    
    var trade_query = new AV.Query(kongcv_trade_cls); 
    trade_query.equalTo("user", user_obj);
    trade_query.count().then(
        function(count) {
            console.log("trade_count:", count);
            invite_code_obj.set("trade_count", count);
            invite_code_obj.save();

            return;
        },
        function(error) {
            console.log("kongcv_loop_invite_code:",error);
            return;
        }
    );
};

AV.Cloud.define("kongcv_loop_invite_code", function(request, response) {
    var skip = request.params.skip;
    if (typeof(skip) == "undefined" || skip.length === 0) {
        console.log("kongcv_loop_invite_code:",ERROR_MSG.ERR_SKIP_MUST_EXIST);
        response.success(ERROR_MSG.ERR_SKIP_MUST_EXIST);
        return;
    }
    
    var limit = request.params.limit;
    if (typeof(limit) == "undefined" || limit.length === 0) {
        console.log("kongcv_loop_invite_code:",ERROR_MSG.ERR_LIMIT_MUST_EXIST);
        response.success(ERROR_MSG.ERR_LIMIT_MUST_EXIST);
        return;
    }
    
    var query = new AV.Query(kongcv_invite_code_cls); 
    //query.descending("updatedAt");
    query.skip(skip);
    query.limit(limit);

    query.find(
        function(results) {
            if (0 === results.length) {
                console.log("kongcv_loop_invite_code:",RESULT_MSG.RET_FAIL);
                response.success("no_results");
                return;
            }

            for (i = 0; i < results.length; i++) {
                _invite_code_handle(results[i]);
            }
 
            response.success("ok");
            return;
        },
        function(error) {
            console.log("kongcv_loop_invite_code:",error);
            response.error(error);
            return;
        }
    );
});

/**                                                                              
 *brief   : 获取日期相差天数                                                     
 *@param  : start_date - "2015-06-01"                                                
 *          end_date - "2015-06-02"                                                
 *@return : num - days number                                                 
 */                                                                               
var get_space_days = function(start_date, end_date) {                           
    var start_minseconds = new Date(start_date);
    var end_minseconds = new Date(end_date); 
    num = parseInt(Math.abs(end_minseconds - start_minseconds) / 1000 / 60 / 60 / 24);            
    return num;                                                               
};

/**                                                                              
 *brief   : date to string                                                     
 *@param  : date - Date("2015-06-01")                                                
 *@return : string                                                
 */ 
var get_date_2_str = function(date) {
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    if (month < 10) {
        month = "0" + month;
    }
    if (day < 10) {
        day = "0" + day;
    }
    var str_date = year + "-" + month + "-" + day;
    return str_date;
};

/**
 * brief   : insert trade data
 * @param  : request - {"user_id":"xxxxxxxxxx","license_plate":"xxxx","hirer_id":"xxx","park_id":"xxxxxxxxxxx", "unit_price":"10/小时","price":100,"hire_start":"2015-10-17 00:00:00", "hire_end":"2015-10-18 00:00:00","hire_method_id":"5620a6dc60b27457e84bb21d","property_id":"xxxx","curb_rate":0.8,"mode":"community", "extra_flag":"1","use_token":1}
 *           response - return result or error
 * @return : RET_OK - success
 *           {"result":"{\"state\":\"ok\",\"code\":1,\"msg\":\"成功}"}
 *           RET_ERROR - system error
 *           {"code":601,"error":"xxxxxx"}
 */
AV.Cloud.define("kongcv_insert_tradedata", function(request, response) {
    var user_id = request.params.user_id;
    if (typeof(user_id) == "undefined" || user_id.length === 0) {
        console.log("kongcv_insert_tradedata:",ERROR_MSG.ERR_USER_ID_MUST_EXIST);
        response.success(ERROR_MSG.ERR_USER_ID_MUST_EXIST);
        return;
    }
   
    var license_plate;
    var user_obj;
    var use_token = request.params.use_token;
    if (typeof(use_token) != "undefined" && 1 === use_token) {
        user_obj = request.user;
        if (typeof(user_obj) == "undefined" || user_obj.length === 0) {
            console.log("kongcv_insert_tradedata:",ERROR_MSG.ERR_USER_SESSIONTOKEN_MUST_EXIST);
            response.success(ERROR_MSG.ERR_USER_SESSIONTOKEN_MUST_EXIST);
            return;
        }

        if (user_id != user_obj.id) {
            console.log("kongcv_insert_tradedata:",ERROR_MSG.ERR_USERID_SESSIONTOKEN_UNMATCHED);
            response.success(ERROR_MSG.ERR_USERID_SESSIONTOKEN_UNMATCHED);
            return;
        }

        license_plate = user_obj.get("license_plate");
    }
    else {
        user_obj = new user_cls();
        user_obj.id = user_id;

        license_plate = request.params.license_plate;
    }

    var hirer_id = request.params.hirer_id;
    if (typeof(hirer_id) == "undefined" || hirer_id.length === 0) {
        console.log("kongcv_insert_tradedata:",ERROR_MSG.ERR_HIRER_MUST_EXIST);
        response.success(ERROR_MSG.ERR_HIRER_MUST_EXIST);
        return;
    }
    if (user_id === hirer_id) {
        console.log("kongcv_insert_tradedata:",ERROR_MSG.ERR_USER_NO_SAME);
        //response.success(ERROR_MSG.ERR_USER_NO_SAME);
        //return;
    }

    var park_id = request.params.park_id;
    if (typeof(park_id) == "undefined" || park_id.length === 0) {
        console.log("kongcv_insert_tradedata:",ERROR_MSG.ERR_PARK_ID_MUST_EXIST);
        response.success(ERROR_MSG.ERR_PARK_ID_MUST_EXIST);
        return;
    }
 
    var hire_method_id = request.params.hire_method_id;
    if (typeof(hire_method_id) == "undefined" || hire_method_id.length === 0) {
        console.log("kongcv_insert_tradedata:",ERROR_MSG.ERR_HIRE_METHOD_MUST_EXIST);
        response.success(ERROR_MSG.ERR_HIRE_METHOD_MUST_EXIST);
        return;
    }

    var curb_rate = request.params.curb_rate;
    var property_id = request.params.property_id;

    var mode = request.params.mode;
    if (typeof(mode) == "undefined" || mode.length === 0) {
        console.log("kongcv_insert_tradedata:",ERROR_MSG.ERR_MODE_MUST_EXIST);
        response.success(ERROR_MSG.ERR_MODE_MUST_EXIST);
        return;
    }

    var hire_start = request.params.hire_start;    
    var hire_end = request.params.hire_end;
 
    var unit_price = request.params.unit_price;
    if (typeof(unit_price) == "undefined" || unit_price.length === 0) {
        console.log("kongcv_insert_tradedata:",ERROR_MSG.ERR_HIRE_PRICE_MUST_EXIST);
        response.success(ERROR_MSG.ERR_HIRE_PRICE_MUST_EXIST);
        return;
    }

    var price = request.params.price;
    if (typeof(price) == "undefined" || price.length === 0) {
        console.log("kongcv_insert_tradedata:",ERROR_MSG.ERR_HIRE_PRICE_MUST_EXIST);
        response.success(ERROR_MSG.ERR_HIRE_PRICE_MUST_EXIST);
        return;
    }
    
    var extra_flag = request.params.extra_flag;
    if (typeof(extra_flag) == "undefined" || extra_flag.length === 0) {
        console.log("kongcv_insert_tradedata:",ERROR_MSG.ERR_EXTRA_FLAG_MUST_EXIST);
        response.success(ERROR_MSG.ERR_EXTRA_FLAG_MUST_EXIST);
        return;
    }
 
    var kongcv_trade_obj = new kongcv_trade_cls();
    kongcv_trade_obj.set("user", user_obj);
 
    if (typeof(license_plate) != "undefined" && license_plate.length > 0) {
        kongcv_trade_obj.set("license_plate", license_plate);
    }
    
    var hirer_obj = new user_cls();
    hirer_obj.id = hirer_id; 
    kongcv_trade_obj.set("hirer", hirer_obj);

    var kongcv_hire_method_obj = new kongcv_hire_method_cls();
    kongcv_hire_method_obj.id = hire_method_id;
    kongcv_trade_obj.set("hire_method", kongcv_hire_method_obj);

    var kongcv_park_obj;
    if ("community" === mode) {
        kongcv_park_obj = new kongcv_park_community_cls();
        kongcv_park_obj.id = park_id;
        
        kongcv_trade_obj.set("park_community", kongcv_park_obj);
        
        if (typeof(property_id) != "undefined" && property_id.length > 0) {
            var kongcv_property_obj = new kongcv_property_cls();
            kongcv_property_obj.id = property_id;
            kongcv_trade_obj.set("property", kongcv_property_obj);
        }
    }
    else if ("curb" === mode) {
        kongcv_park_obj = new kongcv_park_curb_cls();
        kongcv_park_obj.id = park_id;
        
        kongcv_trade_obj.set("park_curb", kongcv_park_obj);    
        
        if (typeof(curb_rate) != "undefined") {
            kongcv_trade_obj.set("curb_rate", curb_rate);
        }
    }
    else {
        console.log("kongcv_insert_tradedata:",ERROR_MSG.ERR_INFO_FORMAT);
        response.success(ERROR_MSG.ERR_INFO_FORMAT);
        return;
    }
  
    var charge_date = [];
    if ("1" === extra_flag) {
        if (typeof(hire_start) == "undefined" || hire_start.length === 0) {
            console.log("kongcv_insert_tradedata:",ERROR_MSG.ERR_HIRE_START_MUST_EXIST);
            response.success(ERROR_MSG.ERR_HIRE_START_MUST_EXIST);
            return;
        }
        kongcv_trade_obj.set("hire_start", new Date(hire_start));

        if (typeof(hire_end) == "undefined" || hire_end.length === 0) {
            console.log("kongcv_insert_tradedata:",ERROR_MSG.ERR_HIRE_END_MUST_EXIST);
            response.success(ERROR_MSG.ERR_HIRE_END_MUST_EXIST);
            return;
        }
        kongcv_trade_obj.set("hire_end", new Date(hire_end));

        //var days = get_space_days(hire_start,hire_end);

        var start_date = new Date(hire_start); 
        var end_date = new Date(hire_end);
        while (true) {
            var next_month = new Date(start_date.setMonth(start_date.getMonth() + 1));
            var str_date = get_date_2_str(next_month);
            if (next_month > end_date) {
                charge_date.push(get_date_2_str(end_date));
                break;
            }
            else {
                charge_date.push(str_date);
            }
        }
        kongcv_trade_obj.set("charge_date", charge_date);
    }
        
    kongcv_trade_obj.set("action", 0);
    kongcv_trade_obj.set("unit_price", unit_price);
    kongcv_trade_obj.set("price", price);
    kongcv_trade_obj.set("extra_flag", extra_flag);

    var trade_query = new AV.Query(kongcv_trade_cls);
    if ("community" === mode) {
        trade_query.equalTo("park_community", kongcv_park_obj);
    }
    else if ("curb" === mode) {
        trade_query.equalTo("park_curb", kongcv_park_obj);
    }

    //trade_query.greaterThanOrEqualTo("pay_state", 1);
    trade_query.equalTo("trade_state", 1);
    trade_query.greaterThanOrEqualTo("hire_end", hire_start);
    trade_query.lessThanOrEqualTo("hire_start", hire_end);
    trade_query.find({
        success : function(results) {
            if (results.length === 0) {
                if ("community" === mode) { 
                    var kongcv_preorder_obj = new kongcv_preorder_cls();
                    kongcv_preorder_obj.set("park_community", kongcv_park_obj);
                    kongcv_preorder_obj.set("user", user_obj);
                    kongcv_preorder_obj.set("preorder", 1);
                    kongcv_preorder_obj.save().then(
                        function(results) { 
                            kongcv_trade_obj.save().then(
                                function(trade_obj) {
                                    var json_obj = eval("("+RESULT_MSG.RET_OK+")");
                                    json_obj["trade_id"] = trade_obj.id;
                                    response.success(JSON.stringify(json_obj));
                                    return;
                                },
                                function(error) {
                                    console.log("kongcv_insert_tradedata:",error);
                                    response.error(error);
                                    return;
                                }
                            );
                        },
                        function(error) {
                            console.log("kongcv_insert_tradedata:",error);
                            if (142 === error.code) {
                                var error_message = error.message.split("Error detail :")[1];
                                response.success(error_message);
                            }
                            else {
                                response.error(error);
                            }
                            return;
                        }
                    ); 
                }
                else if ("curb" === mode) {
                    kongcv_trade_obj.save().then(
                        function(trade_obj) {
                            var json_obj = eval("("+RESULT_MSG.RET_OK+")");
                            json_obj["trade_id"] = trade_obj.id;
                            response.success(JSON.stringify(json_obj));
                            return;
                        },
                        function(error) {
                            console.log("kongcv_insert_tradedata:",error);
                            response.error(error);
                            return;
                        }
                    );
                }
            }
            else if (results.length > 0) { 
                console.log("kongcv_insert_tradedata:",ERROR_MSG.ERR_PARK_DATE_EXIST);
                response.success(ERROR_MSG.ERR_PARK_DATE_EXIST);
                return;
            }
        },
        error : function(error) {
            console.log("kongcv_insert_tradedata:",error);
            response.error(error);
            return;
        }
    });
});

/**
 * brief   : put trade charge
 * @param  : request - {"trade_id":"xxxx", "mode":"curb", "action":"start"}
 *           response - return success or error
 * @return : RET_OK - success
 *           {"result":"{\"state\":\"ok\",\"code\":1,\"msg\":\"成功}"}
 *           error
 *           {"code":142,"error":"xxxxxx"}
 */
AV.Cloud.define("kongcv_put_trade_charge", function(request, response) {
    var trade_id = request.params.trade_id;
    if (typeof(trade_id) == "undefined" || trade_id.length === 0) {
        console.log("kongcv_put_trade_charge:",ERROR_MSG.ERR_TRADE_ID_MUST_EXIST);
        response.success(ERROR_MSG.ERR_TRADE_ID_MUST_EXIST);
        return;
    }
 
    var action = request.params.action;
    if (typeof(action) == "undefined" || action.length === 0) {
        console.log("kongcv_put_trade_charge:",ERROR_MSG.ERR_ACTION_MUST_EXIST);
        response.success(ERROR_MSG.ERR_ACTION_MUST_EXIST);
        return;
    }

    var mode = request.params.mode;
    if (typeof(mode) == "undefined" || mode.length === 0) {
        console.log("kongcv_put_trade_charge:",ERROR_MSG.ERR_MODE_MUST_EXIST);
        response.success(ERROR_MSG.ERR_MODE_MUST_EXIST);
        return;
    }

    var hire_start; 
    var hire_end;
    var price;
    if ("curb" === mode) {
        var trade_query = new AV.Query(kongcv_trade_cls);
        trade_query.get(trade_id, {
            success : function(trade_obj) { 
                var check_state = trade_obj.get("check_state");
                if (2 === check_state) {
                    response.success(ERROR_MSG.ERR_HOUR_METER_FINISHED);
                    return;
                }

                if ("start" === action) {
                    hire_start = new Date(); 
                    trade_obj.set("hire_start", hire_start);
                    trade_obj.set("check_state", 1);
                }
                else if ("end" === action) { 
                    var unit_price = trade_obj.get("unit_price");
                    if (typeof(unit_price) == "undefined" || unit_price.length === 0) {
                        console.log("kongcv_put_trade_charge:",ERROR_MSG.ERR_HIRE_PRICE_MUST_EXIST);
                        response.success(ERROR_MSG.ERR_HIRE_PRICE_MUST_EXIST);
                        return;
                    }

                    var unit_price_value = Number(unit_price.split("/")[0]);
                    if (unit_price_value <= 0) {
                        console.log("kongcv_put_trade_charge:",ERROR_MSG.ERR_TRADE_PRICE);
                        response.success(ERROR_MSG.ERR_TRADE_PRICE);
                        return;
                    }

                    hire_end = new Date(); 
                    var end_minseconds = hire_end.getTime();
                    trade_obj.set("hire_end", hire_end);
                    trade_obj.set("check_state", 2);

                    hire_start = trade_obj.get("hire_start");
                    var start_minseconds = hire_start.getTime();
                    var time_num = parseInt((end_minseconds - start_minseconds) / (15 * 60 * 1000)) + 1;
                    var remainder_time_num = (end_minseconds - start_minseconds) % (15 * 60 * 1000);
                    if (remainder_time_num > (5 * 60 * 1000)) {
                        time_num += 1;
                    }
                    var price_charge = unit_price_value / 4;

                    //price = Math.ceil(time_num * price_charge);
                    price = time_num * price_charge;
                    price = Number(price.toFixed(2));
        
                    var money = trade_obj.get("money");
                    if (Math.abs(money - price) < limit_balance_price || money > price) {
                        price = money;
                        trade_obj.set("trade_state", 1);
                        trade_obj.set("pay_state", 2);
                    }
                    
                    trade_obj.set("price", price);
                    /*if (price < money) {
                        console.log("kongcv_put_trade_charge:",ERROR_MSG.ERR_TRADE_PRICE);
                        response.success(ERROR_MSG.ERR_TRADE_PRICE);
                        return;
                    }*/
                }

                trade_obj.save().then(
                    function(result) {
                        var trade_money = trade_obj.get("money");
                        
                        if ("end" === action) {  
                            if (Math.abs(money - price) < limit_balance_price || money > price) {
                                var curb_rate = trade_obj.get("curb_rate");
                                var hirer_obj = trade_obj.get("hirer");
                                var user_obj = trade_obj.get("user");

                                var purse_query = new AV.Query(kongcv_purse_cls);
                                purse_query.equalTo("user", hirer_obj);
                                purse_query.limit(1);
                                purse_query.find({
                                    success : function(results) {
                                        var hirer_purse_obj;

                                        if (1 === results.length) {
                                            hirer_purse_obj = results[0];
                                        }
                                        else if (0 === results.length) {
                                            hirer_purse_obj = new kongcv_purse_cls();
                                            hirer_purse_obj.set("user", hirer_obj);
                                        }

                                        var own_trade_money;
                                        var own_rate;

                                        if (curb_rate > 0) {
                                            own_rate = curb_rate;
                                        }
                                        else {
                                            own_rate = kongcv_rate;
                                        }

                                        own_trade_money = trade_money * own_rate; 
                                        if (own_trade_money > limit_price) {
                                            own_trade_money = parseInt(own_trade_money);
                                        }
                                        else {
                                            own_trade_money = Number(own_trade_money.toFixed(2));
                                        }
                                        
                                        var tmp_purse_amount = hirer_purse_obj.get("amount");
                                        var tmp_purse_money = hirer_purse_obj.get("money");
                                        var tmp_new_purse_amount = tmp_purse_amount + own_trade_money;
                                        var tmp_new_purse_money = tmp_purse_money + own_trade_money;
                                        hirer_purse_obj.set("amount", Number(tmp_new_purse_amount.toFixed(2)));
                                        hirer_purse_obj.set("money", Number(tmp_new_purse_money.toFixed(2)));
                                        //hirer_purse_obj.increment("amount", own_trade_money);
                                        //hirer_purse_obj.increment("money", own_trade_money);

                                        hirer_purse_obj.save().then(
                                            function(hirer_purse_obj) {
                                            },
                                            function(error) {
                                                var now = new Date();
                                                var date = now.getYear()+"-"+((now.getMonth()+1)<10?"0":"")+(now.getMonth()+1)+"-"+(now.getDate()<10?"0":"")+now.getDate();
                                                _kongcv_insert_loop_trade_log(trade_obj, date, 0, "hirer_curb_balance_0_purse_save" + error);
                                            }
                                        );
                                    },
                                    error : function(error) {
                                        var now = new Date();
                                        var date = now.getYear()+"-"+((now.getMonth()+1)<10?"0":"")+(now.getMonth()+1)+"-"+(now.getDate()<10?"0":"")+now.getDate();
                                        _kongcv_insert_loop_trade_log(trade_obj, date, 0, "hirer_curb_balance_0_purse_query" + error);
                                    }
                                });
                                
                                console.log("no balance expense start");
                                purse_query.equalTo("user", user_obj);
                                purse_query.limit(1);
                                purse_query.find({
                                    success : function(results) {
                                        var user_purse_obj;

                                        if (1 === results.length) {
                                            user_purse_obj = results[0];
                                        }
                                        else if (0 === results.length) {
                                            user_purse_obj = new kongcv_purse_cls();
                                            user_purse_obj.set("user", user_obj);
                                        }

                                        var tmp_user_purse_expense = user_purse_obj.get("expense");
                                        var tmp_user_new_purse_expense = tmp_user_purse_expense + trade_money;
                                        user_purse_obj.set("expense", Number(tmp_user_new_purse_expense.toFixed(2)));
                                        //user_purse_obj.increment("expense", trade_money);

                                        user_purse_obj.save().then(
                                            function(user_purse_obj) {
                                                console.log("no balance expense save");
                                            },
                                            function(error) {
                                                var now = new Date();
                                                var date = now.getYear()+"-"+((now.getMonth()+1)<10?"0":"")+(now.getMonth()+1)+"-"+(now.getDate()<10?"0":"")+now.getDate();
                                                _kongcv_insert_loop_trade_log(trade_obj, date, 0, "user_curb_balance_0_purse_save" + error);
                                            }
                                        );
                                    },
                                    error : function(error) {
                                        var now = new Date();
                                        var date = now.getYear()+"-"+((now.getMonth()+1)<10?"0":"")+(now.getMonth()+1)+"-"+(now.getDate()<10?"0":"")+now.getDate();
                                        _kongcv_insert_loop_trade_log(trade_obj, date, 0, "user_curb_balance_0_purse_query" + error);
                                    }
                                });
                            }
                        }
                    
                        var json_obj = eval("("+RESULT_MSG.RET_OK+")");

                        if ("start" === action) {
                            json_obj["hire_start"] = hire_start;
                        }
                        else if ("end" === action) {
                            json_obj["hire_end"] = hire_end;
                            json_obj["price"] = price;
                            var end_balance = price - trade_money;
                            json_obj["balance"] = Number(end_balance.toFixed(2));
                        }

                        response.success(JSON.stringify(json_obj));
                        return;
                    },
                    function(error) {
                        console.log("kongcv_put_trade_charge:",error);
                        response.error(error);
                        return;
                    }
                );
            },
            error : function(error) {
                console.log("kongcv_put_trade_charge:",error);
                response.error(error);
                return;
            }
        });
    }
    else {
        console.log("kongcv_put_trade_charge:",ERROR_MSG.ERR_INFO_FORMAT);
        response.success(ERROR_MSG.ERR_INFO_FORMAT);
        return;
    }
});

/**
* brief   : insert comment data
* @param  : request - 
*           {"user_id" : "xxxxxx", "comment" : "test comment", "park_id" : "xxxxxxxxxxx", "grade":5, "mode" : "community"} 
*           reponse - define error, result or system error
*           {"result":"{"state":"error", "code":20, "msg":"belong type必填}"}
* @return : success - RET_OK
*           error - define error or system error
*/ 
AV.Cloud.define('kongcv_insert_comment', function(request , response) {
    var user_id = request.params.user_id;
    if (typeof(user_id) == "undefined" || user_id.length === 0) {
        console.log("kongcv_insert_comment:",ERROR_MSG.ERR_USER_ID_MUST_EXIST);
        response.success(ERROR_MSG.ERR_USER_ID_MUST_EXIST);
        return;
    }
    
    var user_obj;
    var use_token = request.params.use_token;
    if (typeof(use_token) != "undefined" && 1 === use_token) {
        user_obj = request.user;
        if (typeof(user_obj) == "undefined" || user_obj.length === 0) {
            console.log("kongcv_insert_comment:",ERROR_MSG.ERR_USER_ID_MUST_EXIST);
            response.success(ERROR_MSG.ERR_USER_SESSIONTOKEN_MUST_EXIST);
            return;
        }

        if (user_id != user_obj.id) {
            console.log("kongcv_insert_comment:",ERROR_MSG.ERR_USERID_SESSIONTOKEN_UNMATCHED);
            response.success(ERROR_MSG.ERR_USERID_SESSIONTOKEN_UNMATCHED);
            return;
        }
    }
    else {
        user_obj = new user_cls();
        user_obj.id = user_id;
    }

    var park_id = request.params.park_id;
    if (typeof(park_id) == "undefined" || park_id.length === 0) {
        console.log("kongcv_insert_comment:",ERROR_MSG.ERR_PARK_ID_MUST_EXIST);
        response.success(ERROR_MSG.ERR_PARK_ID_MUST_EXIST);
        return;
    }
 
    var comment = request.params.comment;
    if (typeof(comment) == "undefined" || comment.length === 0) {
        console.log("kongcv_insert_comment:",ERROR_MSG.ERR_COMMENT_MUST_EXIST);
        response.success(ERROR_MSG.ERR_COMMENT_MUST_EXIST);
        return;
    }

    var mode = request.params.mode;
    if (typeof(mode) == "undefined" || mode.length === 0) {
        console.log("kongcv_insert_comment:",ERROR_MSG.ERR_MODE_MUST_EXIST);
        response.success(ERROR_MSG.ERR_MODE_MUST_EXIST);
        return;
    }

    var grade = request.params.grade; 
      
    var kongcv_comment_obj = new kongcv_comment_cls();
    kongcv_comment_obj.set("user", user_obj);
    kongcv_comment_obj.set("comment", comment);
    kongcv_comment_obj.set("grade", grade);
    
    if ("community" === mode) {
        var kongcv_park_community_obj = new kongcv_park_community_cls();
        kongcv_park_community_obj.id = park_id;
        kongcv_comment_obj.set("park_community", kongcv_park_community_obj);
    }
    else if ("curb" === mode) {
        var kongcv_park_curb_obj = new kongcv_park_curb_cls();
        kongcv_park_curb_obj.id = park_id;
        kongcv_comment_obj.set("park_curb", kongcv_park_curb_obj);
    }
    else if ("share" === mode) {
        var kongcv_park_share_obj = new kongcv_park_share_cls();
        kongcv_park_share_obj.id = park_id;
        kongcv_comment_obj.set("park_share", kongcv_park_share_obj);
    }

    else {
        console.log("kongcv_insert_comment:",ERROR_MSG.ERR_INFO_FORMAT);
        response.success(ERROR_MSG.ERR_INFO_FORMAT);
        return;
    }

    kongcv_comment_obj.save().then(
        function(result) {
            response.success(RESULT_MSG.RET_OK);
            return;
        },
        function(error) {
            console.log("kongcv_insert_comment:",error);
            response.error(error);
            return;
        }
    );
});

/**
* brief   : get comment data
* @param  : request - 
*           {"park_id" : "xxxxxxxxxxx", "skip":0, "limit":10, "mode" : "community"} 
*           reponse - define error, result or system error
*           {"result":"{"state":"error", "code":20, "msg":"belong type必填}"}
* @return : success - RET_OK
*           error - define error or system error
*/ 
AV.Cloud.define('kongcv_get_comment', function(request , response) {
    var park_id = request.params.park_id;
    if (typeof(park_id) == "undefined" || park_id.length === 0) {
        console.log("kongcv_get_comment:",ERROR_MSG.ERR_PARK_ID_MUST_EXIST);
        response.success(ERROR_MSG.ERR_PARK_ID_MUST_EXIST);
        return;
    }
 
    var skip = request.params.skip;
    if (typeof(skip) == "undefined" || skip.length === 0) {
        console.log("kongcv_get_comment:",ERROR_MSG.ERR_SKIP_MUST_EXIST);
        response.success(ERROR_MSG.ERR_SKIP_MUST_EXIST);
        return;
    }
    
    var limit = request.params.limit;
    if (typeof(limit) == "undefined" || limit.length === 0) {
        console.log("kongcv_get_comment:",ERROR_MSG.ERR_LIMIT_MUST_EXIST);
        response.success(ERROR_MSG.ERR_LIMIT_MUST_EXIST);
        return;
    }

    var mode = request.params.mode;
    if (typeof(mode) == "undefined" || mode.length === 0) {
        console.log("kongcv_get_comment:",ERROR_MSG.ERR_MODE_MUST_EXIST);
        response.success(ERROR_MSG.ERR_MODE_MUST_EXIST);
        return;
    }
  
    var query = new AV.Query(kongcv_comment_cls);
    query.descending("createdAt");
    query.skip(skip);
    query.limit(limit);
    query.include("user");
    
    if ("curb" === mode) {
        var kongcv_park_curb_obj = new kongcv_park_curb_cls();
        kongcv_park_curb_obj.id = park_id;
        query.equalTo('park_curb', kongcv_park_curb_obj);
    }
    else if ("community" === mode) {
        var kongcv_park_community_obj = new kongcv_park_community_cls();
        kongcv_park_community_obj.id = park_id;
        query.equalTo('park_community', kongcv_park_community_obj);
    }
    else if ("share" === mode) {
        var kongcv_park_share_obj = new kongcv_park_share_cls();
        kongcv_park_share_obj.id = park_id;
        query.equalTo('park_share', kongcv_park_share_obj);
    }

    else {
        console.log("kongcv_get_comment:",ERROR_MSG.ERR_INFO_FORMAT);
        response.success(ERROR_MSG.ERR_INFO_FORMAT);
        return;
    }

    query.find({
        success :function(results) {
            for (var i = 0; i < results.length; i++) {
                results[i].set("user", JSON.stringify(results[i].get("user")));
            }

            response.success(results);
            return;
        },
        error : function(error) {
            console.log("kongcv_get_comment:",error);
            response.error(error);
            return;
        }
    });
});

/**
 * brief   : search park data
 * @param  : request - {"address":"xxxx","location_info":{"latitude":11.1,"longitude":116.4},"hire_method_id":"xxxx", "hire_field":"xxxx", "sort":"price","mode":"curb", "skip":0, "limit":10}
 *           response - return park recordset or error
 * @return : RET_OK - success
 *           {recordset json array}
 *           RET_ERROR - system error
 *           {"code":601,"error":"xxxxxx"}
 */
var _kongcv_insert_location_search_log = function(address, location_info, hire_method_id, mode) {
    var kongcv_log_location_search_obj = new kongcv_log_location_search_cls();

    kongcv_log_location_search_obj.set("address", address);
    
    var point = new AV.GeoPoint(location_info);
    kongcv_log_location_search_obj.set("location", point);

    var hire_method_obj;
    if (typeof(hire_method_id) != "undefined" && hire_method_id.length > 0) {
        hire_method_obj = new kongcv_hire_method_cls();
        hire_method_obj.id = hire_method_id;
        kongcv_log_location_search_obj.set("hire_method", hire_method_obj);
    }
    
    kongcv_log_location_search_obj.set("mode", mode);

    kongcv_log_location_search_obj.save();
};

AV.Cloud.define("kongcv_location_search", function(request, response) {
    console.log("location_search request.params:",request.params);
    var address = request.params.address;
    if (typeof(address) == "undefined" || address.length === 0) {
        console.log("kongcv_location_search:",ERROR_MSG.ERR_ADDRESS_MUST_EXIST);
        response.success(ERROR_MSG.ERR_ADDRESS_MUST_EXIST);
        return;
    }

    var location_info = request.params.location_info;
    if (typeof(location_info) == "undefined" || location_info.length === 0) {
        console.log("kongcv_location_search:",ERROR_MSG.ERR_LOCATION_INFO_MUST_EXIST);
        response.success(ERROR_MSG.ERR_LOCATION_INFO_MUST_EXIST);
        return;
    }

    var max_distance = 1;
    var hire_method_id = request.params.hire_method_id;
    var hire_field = request.params.hire_field;
    var sort = request.params.sort;

    var skip = request.params.skip;
    if (typeof(skip) == "undefined" || skip.length === 0) {
        console.log("kongcv_location_search:",ERROR_MSG.ERR_SKIP_MUST_EXIST);
        response.success(ERROR_MSG.ERR_SKIP_MUST_EXIST);
        return;
    }
    
    var limit = request.params.limit;
    if (typeof(limit) == "undefined" || limit.length === 0) {
        console.log("kongcv_location_search:",ERROR_MSG.ERR_LIMIT_MUST_EXIST);
        response.success(ERROR_MSG.ERR_LIMIT_MUST_EXIST);
        return;
    }

    var mode = request.params.mode;
    if (typeof(mode) == "undefined" || mode.length === 0) {
        console.log("kongcv_location_search:",ERROR_MSG.ERR_MODE_MUST_EXIST);
        response.success(ERROR_MSG.ERR_MODE_MUST_EXIST);
        return;
    }

    _kongcv_insert_location_search_log(address, location_info, hire_method_id, mode);

    var kong_cls;
    var point = new AV.GeoPoint(location_info);
    if ("curb" === mode) {
        kongcv_cls = kongcv_park_curb_cls;
    }
    else if ("community" === mode) {
        kongcv_cls = kongcv_park_community_cls;
    }
    else if ("share" === mode) {
        kongcv_cls = kongcv_park_share_cls;
    }
    else {
        console.log("kongcv_location_search:",ERROR_MSG.ERR_INFO_FORMAT);
        response.success(ERROR_MSG.ERR_INFO_FORMAT);
        return;
    }

    var query = new AV.Query(kongcv_cls);
    query.withinKilometers("location", point, max_distance);
    query.skip(skip);
    query.limit(limit);
    //query.equalTo('park_space', 1);
    query.equalTo('park_hide', 0);
    query.include("user");
    //query.include("hire_method");
    if (typeof(hire_method_id) != "undefined" && hire_method_id.length > 0) {
        var hire_method_obj = new kongcv_hire_method_cls();
        hire_method_obj.id = hire_method_id;
        query.equalTo("hire_method", hire_method_obj);
    }
    
    if (typeof(sort) != "undefined" && sort.length > 0) {
        if (typeof(hire_field) != "undefined" && hire_field.length > 0) {
            if ("price_asc" === sort) {
                query.addAscending(hire_field);
            }
            else if ("price_desc" === sort) {
                query.addDescending(hire_field);
            }
        }
    }

    query.find({
        success :function(results) {
            for (var i = 0; i < results.length; i++) {
                //results[i].set("hire_method", JSON.stringify(results[i].get("hire_method")));
                results[i].set("user", JSON.stringify(results[i].get("user")));
            }

            response.success(results);
            return;
        },
        error : function(error) {
            console.log("kongcv_location_search:",error);
            response.error(error);
            return;
        }
    });
}); 

/**
 * brief   : set park space
 * @param  : request - {"park_id":"xxxx","park_space":0, "mode":"curb"}
 *           response - return park info
 * @return : RET_OK - success
 *           {recordset json array}
 *           RET_ERROR - system error
 *           {"code":601,"error":"xxxxxx"}
 */
AV.Cloud.define("kongcv_put_park_space", function(request, response) { 
    var park_id = request.params.park_id;
    if (typeof(park_id) == "undefined" || park_id.length === 0) {
        console.log("kongcv_put_park_space:",ERROR_MSG.ERR_PARK_ID_MUST_EXIST);
        response.success(ERROR_MSG.ERR_PARK_ID_MUST_EXIST);
        return;
    }

    var park_space = request.params.park_space;
    if (typeof(park_space) == "undefined" || park_space.length === 0) {
        console.log("kongcv_put_park_space:",ERROR_MSG.ERR_PARK_SPACE_MUST_EXIST);
        response.success(ERROR_MSG.ERR_PARK_SPACE_MUST_EXIST);
        return;
    }

    var mode = request.params.mode;
    if (typeof(mode) == "undefined" || mode.length === 0) {
        console.log("kongcv_put_park_space:",ERROR_MSG.ERR_MODE_MUST_EXIST);
        response.success(ERROR_MSG.ERR_MODE_MUST_EXIST);
        return;
    }

    var kongcv_park_cls;
    if ("curb" === mode) {
        kongcv_park_cls = kongcv_park_curb_cls;
    }
    else if ("community" === mode) {
        kongcv_park_cls = kongcv_park_community_cls;
    }
    else {
        console.log("kongcv_put_park_space:",ERROR_MSG.ERR_INFO_FORMAT);
        response.success(ERROR_MSG.ERR_INFO_FORMAT);
        return;
    }

    var query = new AV.Query(kongcv_park_cls);
    query.get(park_id, {
        success : function(park_obj) {
            park_obj.set("park_space", park_space);

            park_obj.save().then(
                function() {
                    response.success(RESULT_MSG.RET_OK);
                    return;
                },
                function(error) {
                    console.log("kongcv_put_park_space:",error);
                    response.error(error);
                    return;
                }
            ); 
        },
        error : function(error) {
            console.log("kongcv_put_park_space:",error);
            response.error(error);
            return;
        }
    });
});

/**
 * brief   : set park hide
 * @param  : request - {"park_id":"xxxx","hide":0, "mode":"community"}
 *           response - return park info
 * @return : RET_OK - success
 *           {recordset json array}
 *           RET_ERROR - system error
 *           {"code":601,"error":"xxxxxx"}
 */
AV.Cloud.define("kongcv_put_park_hide", function(request, response) { 
    var park_id = request.params.park_id;
    if (typeof(park_id) == "undefined" || park_id.length === 0) {
        console.log("kongcv_put_park_hide:",ERROR_MSG.ERR_PARK_ID_MUST_EXIST);
        response.success(ERROR_MSG.ERR_PARK_ID_MUST_EXIST);
        return;
    }

    var hide = request.params.hide;
    if (typeof(hide) == "undefined" || hide.length === 0) {
        console.log("kongcv_put_park_hide:",ERROR_MSG.ERR_HIDE_MUST_EXIST);
        response.success(ERROR_MSG.ERR_HIDE_MUST_EXIST);
        return;
    }

    var mode = request.params.mode;
    if (typeof(mode) == "undefined" || mode.length === 0) {
        console.log("kongcv_put_park_hide:",ERROR_MSG.ERR_MODE_MUST_EXIST);
        response.success(ERROR_MSG.ERR_MODE_MUST_EXIST);
        return;
    }

    var kongcv_park_cls;
    if ("curb" === mode) {
        kongcv_park_cls = kongcv_park_curb_cls;
    }
    else if ("community" === mode) {
        kongcv_park_cls = kongcv_park_community_cls;
    }
    else if ("share" === mode) {
        kongcv_park_cls = kongcv_park_share_cls;
    }
    else {
        console.log("kongcv_put_park_hide:",ERROR_MSG.ERR_INFO_FORMAT);
        response.success(ERROR_MSG.ERR_INFO_FORMAT);
        return;
    }

    var query = new AV.Query(kongcv_park_cls);
    query.get(park_id, {
        success : function(park_obj) {
            park_obj.set("park_hide", hide);

            park_obj.save().then(
                function() {
                    response.success(RESULT_MSG.RET_OK);
                    return;
                },
                function(error) {
                    console.log("kongcv_put_park_hide:",error);
                    response.error(error);
                    return;
                }
            ); 
        },
        error : function(error) {
            console.log("kongcv_put_park_hide:",error);
            response.error(error);
            return;
        }
    });
});

/**
 * brief   : get park information
 * @param  : request - {"park_id":"xxxx", "mode":"community"}
 *           response - return park info
 * @return : RET_OK - success
 *           {recordset json array}
 *           RET_ERROR - system error
 *           {"code":601,"error":"xxxxxx"}
 */
AV.Cloud.define("kongcv_get_park_info", function(request, response) { 
    var park_id = request.params.park_id;
    if (typeof(park_id) == "undefined" || park_id.length === 0) {
        console.log("kongcv_get_park_info:",ERROR_MSG.ERR_PARK_ID_MUST_EXIST);
        response.success(ERROR_MSG.ERR_PARK_ID_MUST_EXIST);
        return;
    }

    var mode = request.params.mode;
    if (typeof(mode) == "undefined" || mode.length === 0) {
        console.log("kongcv_get_park_info:",ERROR_MSG.ERR_MODE_MUST_EXIST);
        response.success(ERROR_MSG.ERR_MODE_MUST_EXIST);
        return;
    }

    var kongcv_park_cls;
    if ("curb" === mode) {
        kongcv_park_cls = kongcv_park_curb_cls;
    }
    else if ("community" === mode) {
        kongcv_park_cls = kongcv_park_community_cls;
    }
    else if ("share" === mode) {
        kongcv_park_cls = kongcv_park_share_cls;
    }
    else {
        console.log("kongcv_get_park_info:",ERROR_MSG.ERR_INFO_FORMAT);
        response.success(ERROR_MSG.ERR_INFO_FORMAT);
        return;
    }

    var query = new AV.Query(kongcv_park_cls);
    query.equalTo("objectId", park_id);
    if ("curb" === mode) {
        query.include("user_group");
    }
    
    query.include("user");
    query.include("hire_method");
    query.get(park_id, {
        success : function(park_obj) {
            park_obj.set("hire_method", JSON.stringify(park_obj.get("hire_method")));
            if ("curb" === mode) {
                park_obj.set("user_group", JSON.stringify(park_obj.get("user_group")));
            }
            park_obj.set("user", JSON.stringify(park_obj.get("user")));

            response.success(park_obj);
            return;
        },
        error : function(error) {
            console.log("kongcv_get_park_info:",error);
            response.error(error);
            return;
        }
    });
});

/**
 * brief   : get park list
 * @param  : request - {"user_id":"xxxxx", "mobile":"xxxx","skip":0, "limit":10,"mode":"community", "action":"userid","use_token":1}
 *           response - return result or error
 * @return : RET_OK - success
 *           {"result":"{\"state\":\"ok\",\"code\":1,\"msg\":\"成功}"}
 *           RET_ERROR - system error
 *           {"code":601,"error":"xxxxxx"}
 */
AV.Cloud.define("kongcv_get_park_list", function(request, response) {
    var action = request.params.action;
    if (typeof(action) == "undefined" || action.length === 0) {
        console.log("kongcv_get_park_list:",ERROR_MSG.ERR_ACTION_MUST_EXIST);
        response.success(ERROR_MSG.ERR_ACTION_MUST_EXIST);
        return;
    }
  
    var skip = request.params.skip;
    if (typeof(skip) == "undefined" || skip.length === 0) {
        console.log("kongcv_get_park_list:",ERROR_MSG.ERR_SKIP_MUST_EXIST);
        response.success(ERROR_MSG.ERR_SKIP_MUST_EXIST);
        return;
    }
    
    var limit = request.params.limit;
    if (typeof(limit) == "undefined" || limit.length === 0) {
        console.log("kongcv_get_park_list:",ERROR_MSG.ERR_LIMIT_MUST_EXIST);
        response.success(ERROR_MSG.ERR_LIMIT_MUST_EXIST);
        return;
    }

    var mode = request.params.mode;
    if (typeof(mode) == "undefined" || mode.length === 0) {
        console.log("kongcv_get_park_list:",ERROR_MSG.ERR_MODE_MUST_EXIST);
        response.success(ERROR_MSG.ERR_MODE_MUST_EXIST);
        return;
    }

    var user_id;
    var mobile;
    if ("userid" === action) {
        user_id = request.params.user_id;
        if (typeof(user_id) == "undefined" || user_id.length === 0) {
            console.log("kongcv_get_park_list:",ERROR_MSG.ERR_USER_ID_MUST_EXIST);
            response.success(ERROR_MSG.ERR_USER_ID_MUST_EXIST);
            return;
        } 
    }
    else if ("mobile" === action) {
        mobile = request.params.mobile;
        if (typeof(mobile) == "undefined" || mobile.length === 0) {
            console.log("kongcv_get_park_list:",ERROR_MSG.ERR_USER_MOBILE_MUST_EXIST);
            response.success(ERROR_MSG.ERR_USER_MOBILE_MUST_EXIST);
            return;
        }
        if ("curb" != mode) {
            console.log("kongcv_get_park_list:",ERROR_MSG.ERR_INFO_FORMAT);
            response.success(ERROR_MSG.ERR_INFO_FORMAT);
            return;
        }
    }
    else {
        console.log("kongcv_get_park_list:",ERROR_MSG.ERR_INFO_FORMAT);
        response.success(ERROR_MSG.ERR_INFO_FORMAT);
        return;
    }

    var kongcv_park_cls;
    if ("curb" === mode) {
        kongcv_park_cls = kongcv_park_curb_cls;
    }
    else if ("community" === mode) {
        kongcv_park_cls = kongcv_park_community_cls;
    }
    else if ("share" === mode) {
        kongcv_park_cls = kongcv_park_share_cls;
    }
    else {
        console.log("kongcv_get_park_list:",ERROR_MSG.ERR_INFO_FORMAT);
        response.success(ERROR_MSG.ERR_INFO_FORMAT);
        return;
    }

    var park_query = new AV.Query(kongcv_park_cls);
    park_query.descending("createdAt");
    park_query.skip(skip);
    park_query.limit(limit);
    //park_query.include("user");
    //park_query.include("hire_method");

    if ("mobile" === action) { 
        AV.User.logIn(user_0, user_0_ps, {
            success :function(user_admin) { 
                var user_query = new AV.Query(AV.User);
                user_query.equalTo("mobilePhoneNumber", mobile);
                user_query.find({
                    success : function(results) {
                        if (0 === results.length) {
                            console.log("kongcv_get_park_list:",ERROR_MSG.ERR_USER_NO_SIGNUP);
                            response.success(ERROR_MSG.ERR_USER_NO_SIGNUP);
                            return;
                        }

                        var user_obj = results[0];
                        //var user_obj = new user_cls();
                        //user_obj.id = user.id;

                        park_query.equalTo("user", user_obj);
                        park_query.find({
                            success : function(results) {
                                /*for (var i = 0; i < results.length; i++) {
                                  results[i].set("hire_method", JSON.stringify(results[i].get("hire_method")));
                                  results[i].set("user", JSON.stringify(results[i].get("user")));
                                  }*/

                                response.success(results);
                                return;
                            },
                            error : function(error) {
                                console.log("kongcv_get_park_list:",error);
                                response.error(error);
                                return;
                            }
                        });
                    },
                    error : function(error) {
                        console.log("kongcv_get_park_list:",error);
                        response.error(error);
                        return;
                    }
                });
            },
            error : function(error) {
                console.log("kongcv_get_park_list:",error);
                response.error(error);
                return;
            }
        }); 
    }
    else if ("userid" === action) {
        var user_obj;
        var use_token = request.params.use_token;
        if (typeof(use_token) != "undefined" && 1 === use_token) {
            user_obj = request.user;
            if (typeof(user_obj) == "undefined" || user_obj.length === 0) {
                console.log("kongcv_get_park_list:",ERROR_MSG.ERR_USER_SESSIONTOKEN_MUST_EXIST);
                response.success(ERROR_MSG.ERR_USER_SESSIONTOKEN_MUST_EXIST);
                return;
            }

            if (user_id != user_obj.id) {
                console.log("kongcv_get_park_list:",ERROR_MSG.ERR_USERID_SESSIONTOKEN_UNMATCHED);
                response.success(ERROR_MSG.ERR_USERID_SESSIONTOKEN_UNMATCHED);
                return;
            }
        }
        else {
            user_obj = new user_cls();
            user_obj.id = user_id;
        }
        
        park_query.equalTo("user", user_obj);
        park_query.find({
            success : function(results) {
                for (var i = 0; i < results.length; i++) {
                    results[i].set("hire_method", JSON.stringify(results[i].get("hire_method")));
                    results[i].set("user", JSON.stringify(results[i].get("user")));
                }

                response.success(results);
                return;
            },
            error : function(error) {
                console.log("kongcv_get_park_list:",error);
                response.error(error);
                return;
            }
        });
    }
    else {
        console.log("kongcv_get_park_list:",ERROR_MSG.ERR_INFO_FORMAT);
        response.success(ERROR_MSG.ERR_INFO_FORMAT);
        return;
    }
});

/**
 * brief   : get trade information
 * @param  : request - {"trade_id":"xxxx","role":"hirer", "mode":"community"}
 *           response - return park info
 * @return : RET_OK - success
 *           {recordset json array}
 *           RET_ERROR - system error
 *           {"code":601,"error":"xxxxxx"}
 */
AV.Cloud.define("kongcv_get_trade_info", function(request, response) { 
    var trade_id = request.params.trade_id;
    if (typeof(trade_id) == "undefined" || trade_id.length === 0) {
        console.log("kongcv_get_trade_info:",ERROR_MSG.ERR_TRADE_ID_MUST_EXIST);
        response.success(ERROR_MSG.ERR_TRADE_ID_MUST_EXIST);
        return;
    }

    var role = request.params.role;
    if (typeof(role) == "undefined" || role.length === 0) {
        console.log("kongcv_get_trade_info:",ERROR_MSG.ERR_ROLE_MUST_EXIST);
        response.success(ERROR_MSG.ERR_ROLE_MUST_EXIST);
        return;
    }

    var mode = request.params.mode;
    if (typeof(mode) == "undefined" || mode.length === 0) {
        console.log("kongcv_get_trade_info:",ERROR_MSG.ERR_MODE_MUST_EXIST);
        response.success(ERROR_MSG.ERR_MODE_MUST_EXIST);
        return;
    }

    var query = new AV.Query(kongcv_trade_cls);
    query.include("hire_method");
    
    if ("community" === mode) {
        query.include("park_community");
    }
    else if ("curb" === mode) {
        query.include("park_curb");
    }

    if ("customer" === role) {
        query.include("hirer");
    }
    else if ("hirer" === role) {
        query.include("user");
    }
    else if ("hirer_second" === role) {
        query.include("user");
    }
    else {
        console.log("kongcv_get_trade_info:",ERROR_MSG.ERR_INFO_FORMAT);
        response.success(ERROR_MSG.ERR_INFO_FORMAT);
        return;
    }

    query.get(trade_id, {
        success : function(trade_obj) {
            trade_obj.set("hire_method", JSON.stringify(trade_obj.get("hire_method")));

            if ("customer" === role) {
                if ("community" === mode) {
                    trade_obj.set("park_community", JSON.stringify(trade_obj.get("park_community")));
                }
                else if ("curb" === mode) {
                    trade_obj.set("park_curb", JSON.stringify(trade_obj.get("park_curb")));
                }
    trade_obj.set("hirer", JSON.stringify(trade_obj.get("hirer")));
            }
            else if ("hirer" === role) {
                trade_obj.set("user", JSON.stringify(trade_obj.get("user")));
            }
            else if ("hirer_second" === role) { 
                trade_obj.set("user", JSON.stringify(trade_obj.get("user")));
            }

            /*if ("community" === mode) {
                trade_obj.set("park_community", JSON.stringify(trade_obj.get("park_community")));
            }
            else if ("curb" === mode) {
                trade_obj.set("park_curb", JSON.stringify(trade_obj.get("park_curb")));
            }*/

            response.success(trade_obj);
            return;
        },
        error : function(error) {
            console.log("kongcv_get_trade_info:",error);
            response.error(error);
            return;
        }
    });
});

/**
 * brief   : get trade list
 * @param  : request - {"user_id":"xxxxx", "role":"customer","hire_method_id":"xxxx", "trade_state":0,"skip":0, "limit":10,"mode":"community","use_token":1}
 *           response - return result or error
 * @return : RET_OK - success
 *           {"result":"{\"state\":\"ok\",\"code\":1,\"msg\":\"成功}"}
 *           RET_ERROR - system error
 *           {"code":601,"error":"xxxxxx"}
 */
AV.Cloud.define("kongcv_get_trade_list", function(request, response) { 
    var user_id = request.params.user_id;
    if (typeof(user_id) == "undefined" || user_id.length === 0) {
        console.log("kongcv_get_trade_list:",ERROR_MSG.ERR_USER_ID_MUST_EXIST);
        response.success(ERROR_MSG.ERR_USER_ID_MUST_EXIST);
        return;
    }

    var user_obj;
    var use_token = request.params.use_token;
    if (typeof(use_token) != "undefined" && 1 === use_token) {
        user_obj = request.user;
        if (typeof(user_obj) == "undefined" || user_obj.length === 0) {
            console.log("kongcv_get_trade_list:",ERROR_MSG.ERR_USER_SESSIONTOKEN_MUST_EXIST);
            response.success(ERROR_MSG.ERR_USER_SESSIONTOKEN_MUST_EXIST);
            return;
        }

        if (user_id != user_obj.id) {
            console.log("kongcv_get_trade_list:",ERROR_MSG.ERR_USERID_SESSIONTOKEN_UNMATCHED);
            response.success(ERROR_MSG.ERR_USERID_SESSIONTOKEN_UNMATCHED);
            return;
        }
    }
    else {
        user_obj = new user_cls();
        user_obj.id = user_id;
    }

    var role = request.params.role;
    if (typeof(role) == "undefined" || role.length === 0) {
        console.log("kongcv_get_trade_list:",ERROR_MSG.ERR_ROLE_MUST_EXIST);
        response.success(ERROR_MSG.ERR_ROLE_MUST_EXIST);
        return;
    }

    var trade_state = request.params.trade_state;
    if (typeof(trade_state) == "undefined" || trade_state.length === 0) {
        console.log("kongcv_get_trade_list:",ERROR_MSG.ERR_TRADE_STATE_MUST_EXIST);
        response.success(ERROR_MSG.ERR_TRADE_STATE_MUST_EXIST);
        return;
    }

    var skip = request.params.skip;
    if (typeof(skip) == "undefined" || skip.length === 0) {
        console.log("kongcv_get_trade_list:",ERROR_MSG.ERR_SKIP_MUST_EXIST);
        response.success(ERROR_MSG.ERR_SKIP_MUST_EXIST);
        return;
    }
    
    var limit = request.params.limit;
    if (typeof(limit) == "undefined" || limit.length === 0) {
        console.log("kongcv_get_trade_list:",ERROR_MSG.ERR_LIMIT_MUST_EXIST);
        response.success(ERROR_MSG.ERR_LIMIT_MUST_EXIST);
        return;
    }

    var mode = request.params.mode;
    if (typeof(mode) == "undefined" || mode.length === 0) {
        console.log("kongcv_get_trade_list:",ERROR_MSG.ERR_MODE_MUST_EXIST);
        response.success(ERROR_MSG.ERR_MODE_MUST_EXIST);
        return;
    }
 
    var kongcv_park_cls;
    if ("curb" === mode) {
        kongcv_park_cls = kongcv_park_curb_cls;
    }
    else if ("community" === mode) {
        kongcv_park_cls = kongcv_park_community_cls;
    }
    else {
        console.log("kongcv_get_trade_list:",ERROR_MSG.ERR_INFO_FORMAT);
        response.success(ERROR_MSG.ERR_INFO_FORMAT);
        return;
    }

    var trade_query = new AV.Query(kongcv_trade_cls);
    trade_query.descending("createdAt");
    trade_query.skip(skip);
    trade_query.limit(limit);
    trade_query.include("hire_method");
    trade_query.select("-charge_date");
    trade_query.select("-trade_bill_id");

    if ("community" === mode) {
        trade_query.exists("park_community");
        trade_query.include("park_community");
    }
    else if ("curb" === mode) {
        var hire_method_id = request.params.hire_method_id;
        if (typeof(hire_method_id) != "undefined" && hire_method_id.length > 0) {
            var kongcv_hire_method_obj = new kongcv_hire_method_cls();
            kongcv_hire_method_obj.id = hire_method_id;
            trade_query.equalTo("hire_method", kongcv_hire_method_obj);
        }

        trade_query.exists("park_curb");
        trade_query.include("park_curb");
    }
    else {
        console.log("kongcv_get_trade_list:",ERROR_MSG.ERR_INFO_FORMAT);
        response.success(ERROR_MSG.ERR_INFO_FORMAT);
        return;
    }

    if ("customer" === role) {
        trade_query.equalTo("user", user_obj);
        trade_query.include("hirer");
    }
    else if ("hirer" === role) {
        trade_query.equalTo("hirer", user_obj); 
        trade_query.include("user");
    }
    else if ("hirer_second" === role) {
        var park_query = new AV.Query(kongcv_park_cls); 
        trade_query.include("user");
        park_query.equalTo("user_group", user_obj);

        if ("community" === mode) {
            trade_query.matchesQuery("park_community", park_query);
        }
        else if ("curb" === mode) {
            trade_query.matchesQuery("park_curb", park_query);
        }  
    }
    else {
        console.log("kongcv_get_trade_list:",ERROR_MSG.ERR_INFO_FORMAT);
        response.success(ERROR_MSG.ERR_INFO_FORMAT);
        return;
    }
   
    if (0 === trade_state || 1 === trade_state) {
        trade_query.equalTo("trade_state", trade_state);
    }

    trade_query.find({
        success : function(results) {
            for (var i = 0; i < results.length; i++) {
                results[i].set("hire_method", JSON.stringify(results[i].get("hire_method")));
                
                if ("customer" === role) {
                    if ("community" === mode) {
                        results[i].set("park_community", JSON.stringify(results[i].get("park_community")));
                    }
                    else if ("curb" === mode) {
                        results[i].set("park_curb", JSON.stringify(results[i].get("park_curb")));
                    }
                    results[i].set("hirer", JSON.stringify(results[i].get("hirer")));
                }
                else if ("hirer" === role) {
                    results[i].set("user", JSON.stringify(results[i].get("user")));
                }
                else if ("hirer_second" === role) { 
                    results[i].set("user", JSON.stringify(results[i].get("user")));
                }    
            }

            response.success(results);
            return;
        },
        error : function(error) {
            console.log("kongcv_get_trade_list:",error);
            response.error(error);
            return;
        }
    });
});

/**
 * brief   : get pushmessage list
 * @param  : request - {"mobilePhoneNumber":"xxxxx", "skip":0, "limit":10,"action":"send","mode":"community"}
 *           response - return result or error
 * @return : RET_OK - success
 *           {"result":"{\"state\":\"ok\",\"code\":1,\"msg\":\"成功}"}
 *           RET_ERROR - system error
 *           {"code":601,"error":"xxxxxx"}
 */
AV.Cloud.define("kongcv_get_pushmessage_list", function(request, response) {
    var mobilePhoneNumber = request.params.mobilePhoneNumber;
    if (typeof(mobilePhoneNumber) == "undefined" || mobilePhoneNumber.length === 0) {
        console.log("kongcv_get_pushmessage_list:",ERROR_MSG.ERR_USER_MOBILE_MUST_EXIST);
        response.success(ERROR_MSG.ERR_USER_MOBILE_MUST_EXIST);
        return;
    }
 
    var action = request.params.action;
    if (typeof(action) == "undefined" || action.length === 0) {
        console.log("kongcv_get_pushmessage_list:",ERROR_MSG.ERR_ACTION_MUST_EXIST);
        response.success(ERROR_MSG.ERR_ACTION_MUST_EXIST);
        return;
    }

    var skip = request.params.skip;
    if (typeof(skip) == "undefined" || skip.length === 0) {
        console.log("kongcv_get_pushmessage_list:",ERROR_MSG.ERR_SKIP_MUST_EXIST);
        response.success(ERROR_MSG.ERR_SKIP_MUST_EXIST);
        return;
    }
    
    var limit = request.params.limit;
    if (typeof(limit) == "undefined" || limit.length === 0) {
        console.log("kongcv_get_pushmessage_list:",ERROR_MSG.ERR_LIMIT_MUST_EXIST);
        response.success(ERROR_MSG.ERR_LIMIT_MUST_EXIST);
        return;
    }
    
    var mode = request.params.mode;

    var message_query = new AV.Query(kongcv_push_message_cls);
    if ("send" === action) {
        message_query.equalTo("own_mobile", mobilePhoneNumber);
        message_query.equalTo("push_type", "verify_request");
    }
    else if ("recv" === action) {
        message_query.equalTo("req_mobile", mobilePhoneNumber);
        message_query.equalTo("push_type", "verify_request");
        
        if (typeof(mode) == "undefined" || mode.length === 0) {
            console.log("kongcv_get_pushmessage_list:",ERROR_MSG.ERR_MODE_MUST_EXIST);
            response.success(ERROR_MSG.ERR_MODE_MUST_EXIST);
            return;
        }
        message_query.equalTo("mode", mode);
    }
    else {
        console.log("kongcv_get_pushmessage_list:",ERROR_MSG.ERR_INFO_FORMAT);
        response.success(ERROR_MSG.ERR_INFO_FORMAT);
        return;
    }
   
    message_query.skip(skip);
    message_query.limit(limit);
    message_query.descending("createdAt");
    message_query.find({
        success : function(results) {
            response.success(results);
        },
        error : function(error) {
            console.log("kongcv_get_pushmessage_list:",error);
            response.error(error);
            return;
        }
    });
});

/**
 * brief   : insert feedback info
 * @param  : request - {"user_id":"xxxx", "feedback":"xxxxx","use_token":1}
 *           response - return success or error
 * @return : RET_OK - success
 *           {"result":"{\"state\":\"ok\",\"code\":1,\"msg\":\"成功}"}
 *           error
 *           {"code":142,"error":"xxxxxx"}
 */
AV.Cloud.define("kongcv_insert_feedback", function(request, response) {
    var user_id = request.params.user_id;
    if (typeof(user_id) == "undefined" || user_id.length === 0) {
        console.log("kongcv_insert_feedback:",ERROR_MSG.ERR_USER_ID_MUST_EXIST);
        response.success(ERROR_MSG.ERR_USER_ID_MUST_EXIST);
        return;
    }

    var user_obj;
    var use_token = request.params.use_token;
    if (typeof(use_token) != "undefined" && 1 === use_token) {
        user_obj = request.user;
        if (typeof(user_obj) == "undefined" || user_obj.length === 0) {
            console.log("kongcv_insert_feedback:",ERROR_MSG.ERR_USER_SESSIONTOKEN_MUST_EXIST);
            response.success(ERROR_MSG.ERR_USER_SESSIONTOKEN_MUST_EXIST);
            return;
        }

        if (user_id != user_obj.id) {
            console.log("kongcv_insert_feedback:",ERROR_MSG.ERR_USERID_SESSIONTOKEN_UNMATCHED);
            response.success(ERROR_MSG.ERR_USERID_SESSIONTOKEN_UNMATCHED);
            return;
        }
    }
    else {
        user_obj = new user_cls();
        user_obj.id = user_id;
    }

    var feedback = request.params.feedback;
    if (typeof(feedback) == "undefined" || feedback.length === 0) {
        console.log("kongcv_insert_feedback:",ERROR_MSG.ERR_FEEDBACK_MUST_EXIST);
        response.success(ERROR_MSG.ERR_FEEDBACK_MUST_EXIST);
        return;
    }

    var kongcv_feedback_obj = new kongcv_feedback_cls();
 
    kongcv_feedback_obj.set("user", user_obj);
    kongcv_feedback_obj.set("feed_back", feedback);

    kongcv_feedback_obj.save().then(
        function() {
            response.success(RESULT_MSG.RET_OK);
            return;
        },
        function(error) {
            console.log("kongcv_insert_feedback:",error);
            response.error(error);
            return;
        }
    ); 
});

/**
 * brief   : change push message state
 * @param  : request - {"message_id":"xxxx", "state":1}
 *           response - return success or error
 * @return : RET_OK - success
 *           {"result":"{\"state\":\"ok\",\"code\":1,\"msg\":\"成功}"}
 *           error
 *           {"code":142,"error":"xxxxxx"}
 */
AV.Cloud.define("kongcv_change_pushmessage_state", function(request, response) {
    var message_id = request.params.message_id;
    if (typeof(message_id) == "undefined" || message_id.length === 0) {
        console.log("kongcv_change_pushmessage_state:",ERROR_MSG.ERR_MESSAGE_ID_MUST_EXIST);
        response.success(ERROR_MSG.ERR_MESSAGE_ID_MUST_EXIST);
        return;
    }
    
    var state = request.params.state;
    if (typeof(state) == "undefined" || state.length === 0) {
        console.log("kongcv_change_pushmessage_state:",ERROR_MSG.ERR_MESSAGE_STATE_MUST_EXIST);
        response.success(ERROR_MSG.ERR_MESSAGE_STATE_MUST_EXIST);
        return;
    }

    var message_query = new AV.Query(kongcv_push_message_cls);
    message_query.get(message_id, {
        success : function(message_obj) {
            message_obj.set("state", state);
            message_obj.save().then(
                function() {
                    response.success(RESULT_MSG.RET_OK);
                    return;
                },
                function(error) {
                    console.log("kongcv_change_pushmessage_state:",error);
                    response.error(error);
                    return;
                }
            );        
        },
        error : function(error) {
            console.log("kongcv_change_pushmessage_state:",error);
            response.error(error);
            return;
        }
    });
}); 

/**
 * brief   : query white list
 * @param  : request - {"mobilePhoneNumber":"xxxx", "use_token":1}
 *           response - return success or error
 * @return : RET_OK - success
 *           {"result":"{\"state\":\"ok\",\"code\":1,\"msg\":\"成功}"}
 *           error
 *           {"code":142,"error":"xxxxxx"}
 */
AV.Cloud.define("kongcv_query_white_list", function(request, response) {
    var mobilePhoneNumber = request.params.mobilePhoneNumber; 
    if (typeof(mobilePhoneNumber) == "undefined" || mobilePhoneNumber.length === 0) {
        console.log("kongcv_query_white_list:",ERROR_MSG.ERR_USER_MOBILE_MUST_EXIST);
        response.success(ERROR_MSG.ERR_USER_MOBILE_MUST_EXIST);
        return;
    }

    var use_token = request.params.use_token;
    if (typeof(use_token) != "undefined" && 1 === use_token) {
        var user_obj = request.user;
        if (typeof(user_obj) == "undefined" || user_obj.length === 0) {
            console.log("kongcv_query_white_list:",ERROR_MSG.ERR_USER_SESSIONTOKEN_MUST_EXIST);
            response.success(ERROR_MSG.ERR_USER_SESSIONTOKEN_MUST_EXIST);
            return;
        }

        if (mobilePhoneNumber != user_obj.mobilePhoneNumber) {
            console.log("kongcv_query_white_list:",ERROR_MSG.ERR_USERID_SESSIONTOKEN_UNMATCHED);
            response.success(ERROR_MSG.ERR_USERID_SESSIONTOKEN_UNMATCHED);
            return;
        }
    }

    var white_list_query = new AV.Query(kongcv_white_list_cls); 
    white_list_query.equalTo("mobilePhoneNumber", mobilePhoneNumber);
    white_list_query.find({
        success : function(white_list_obj) {                
            if (1 === white_list_obj.length) {
                response.success(RESULT_MSG.RET_OK);
            }
            else if (0 === white_list_obj.length) {
                response.success(RESULT_MSG.RET_FAIL);
            }
        },
        error : function(error) {
            console.log("kongcv_query_white_list:",error);
            response.error(error);
            return;
        }
    });
});

/**
 * brief   : insert withdraw deposit
 * @param  : request - {"user_id":"xxxx", "money":50, "use_token":1}
 *           response - return success or error
 * @return : RET_OK - success
 *           {"result":"{\"state\":\"ok\",\"code\":1,\"msg\":\"成功}"}
 *           error
 *           {"code":142,"error":"xxxxxx"}
 */
AV.Cloud.define("kongcv_insert_withdraw_deposit", function(request, response) {
    var user_id = request.params.user_id;
    if (typeof(user_id) == "undefined" || user_id.length === 0) {
        console.log("kongcv_insert_withdraw_deposit:",ERROR_MSG.ERR_USER_ID_MUST_EXIST);
        response.success(ERROR_MSG.ERR_USER_ID_MUST_EXIST);
        return;
    }

    var user_obj;
    var use_token = request.params.use_token;
    if (typeof(use_token) != "undefined" && 1 === use_token) {
        user_obj = request.user;
        if (typeof(user_obj) == "undefined" || user_obj.length === 0) {
            console.log("kongcv_insert_withdraw_deposit:",ERROR_MSG.ERR_USER_SESSIONTOKEN_MUST_EXIST);
            response.success(ERROR_MSG.ERR_USER_SESSIONTOKEN_MUST_EXIST);
            return;
        }

        if (user_id != user_obj.id) {
            console.log("kongcv_insert_withdraw_deposit:",ERROR_MSG.ERR_USERID_SESSIONTOKEN_UNMATCHED);
            response.success(ERROR_MSG.ERR_USERID_SESSIONTOKEN_UNMATCHED);
            return;
        }
    }
    else {
        user_obj = new AV.User();
        user_obj.id = user_id;
    }

    var money = request.params.money;
    if (typeof(money) == "undefined" || money.length === 0) {
        console.log("kongcv_insert_withdraw_deposit:",ERROR_MSG.ERR_MONEY_MUST_EXIST);
        response.success(ERROR_MSG.ERR_MONEY_MUST_EXIST);
        return;
    }

    var purse_query = new AV.Query(kongcv_purse_cls);
    purse_query.equalTo("user", user_obj);
    purse_query.limit(1);
    purse_query.find({
        success : function(results) { 
            if (0 === results.length) {
                response.success(RESULT_MSG.RET_FAIL);
                return;
            }

            var purse_obj = results[0];
            var purse_money = purse_obj.get("money");
            if (money > purse_money) {
                console.log("kongcv_insert_withdraw_deposit:",ERROR_MSG.ERR_MONEY_WITHDRAW_DEPOSIT);
                response.success(ERROR_MSG.ERR_MONEY_WITHDRAW_DEPOSIT);
                return;
            }
            
            var kongcv_trade_obj = new kongcv_trade_cls();
            kongcv_trade_obj.set("money", money);
            kongcv_trade_obj.set("action", 1);
            kongcv_trade_obj.set("user", user_obj);
            kongcv_trade_obj.save().then(
                function(results) {
                    var tmp_purse_money = purse_obj.get("money");
                    var tmp_new_purse_money = tmp_purse_money - money;
                    purse_obj.set("money", Number(tmp_new_purse_money.toFixed(2)));
                    //purse_obj.increment("money",-money);
                    purse_obj.save().then(
                        function(results) { 
                            response.success(RESULT_MSG.RET_OK);
                            return;
                        },
                        function(error) {
                            console.log("kongcv_insert_withdraw_deposit:",error);
                            response.error(error);
                            return;
                        }
                    )
                },
                function(error) {
                    console.log("kongcv_insert_withdraw_deposit:",error);
                    response.error(error);
                    return;
                }
            );
        },
        error : function(error) {
            console.log("kongcv_insert_withdraw_deposit:",error);
            response.error(error);
            return;
        }
    }); 
});

/**
 * brief   : get withdraw deposit
 * @param  : request - {"user_id":"xxxxx","skip":0, "limit":10,"use_token":1}
 *           response - return result or error
 * @return : RET_OK - success
 *           {"result":"{\"state\":\"ok\",\"code\":1,\"msg\":\"成功}"}
 *           RET_ERROR - system error
 *           {"code":601,"error":"xxxxxx"}
 */
AV.Cloud.define("kongcv_get_withdraw_deposit", function(request, response) { 
    var user_id = request.params.user_id;
    if (typeof(user_id) == "undefined" || user_id.length === 0) {
        console.log("kongcv_get_withdraw_deposit:",ERROR_MSG.ERR_USER_ID_MUST_EXIST);
        response.success(ERROR_MSG.ERR_USER_ID_MUST_EXIST);
        return;
    }
    
    var user_obj;
    var use_token = request.params.use_token;
    if (typeof(use_token) != "undefined" && 1 === use_token) {
        user_obj = request.user;
        if (typeof(user_obj) == "undefined" || user_obj.length === 0) {
            console.log("kongcv_get_withdraw_deposit:",ERROR_MSG.ERR_USER_SESSIONTOKEN_MUST_EXIST);
            response.success(ERROR_MSG.ERR_USER_SESSIONTOKEN_MUST_EXIST);
            return;
        }

        if (user_id != user_obj.id) {
            console.log("kongcv_get_withdraw_deposit:",ERROR_MSG.ERR_USERID_SESSIONTOKEN_UNMATCHED);
            response.success(ERROR_MSG.ERR_USERID_SESSIONTOKEN_UNMATCHED);
            return;
        }
    }
    else {
        user_obj = new user_cls();
        user_obj.id = user_id;
    }

    var skip = request.params.skip;
    if (typeof(skip) == "undefined" || skip.length === 0) {
        console.log("kongcv_get_withdraw_deposit:",ERROR_MSG.ERR_SKIP_MUST_EXIST);
        response.success(ERROR_MSG.ERR_SKIP_MUST_EXIST);
        return;
    }
    
    var limit = request.params.limit;
    if (typeof(limit) == "undefined" || limit.length === 0) {
        console.log("kongcv_get_withdraw_deposit:",ERROR_MSG.ERR_LIMIT_MUST_EXIST);
        response.success(ERROR_MSG.ERR_LIMIT_MUST_EXIST);
        return;
    }

    var trade_query = new AV.Query(kongcv_trade_cls);
    trade_query.descending("createdAt");
    trade_query.equalTo("user", user_obj);
    //trade_query.equalTo("action", 1);
    trade_query.containedIn("action", [1,4]);
    trade_query.skip(skip);
    trade_query.limit(limit);

    trade_query.find({
        success : function(results) {
            response.success(results);
        },
        error : function(error) {
            console.log("kongcv_get_withdraw_deposit:",error);
            response.error(error);
            return;
        }
    });
});

/**
 * brief   : verify purse passwd
 * @param  : request - {"user_id":"xxxxx","passwd":"xxxx","use_token":1}
 *           response - return success or error
 * @return : RET_OK - success
 *           {"result":"{\"state\":\"ok\",\"code\":1,\"msg\":\"成功}"}
 *           error
 *           {"code":142,"error":"xxxxxx"}
 */
AV.Cloud.define("kongcv_verify_purse_passwd", function(request, response) {
    var user_id = request.params.user_id;
    if (typeof(user_id) == "undefined" || user_id.length === 0) {
        console.log("kongcv_verify_purse_passwd:",ERROR_MSG.ERR_USER_ID_MUST_EXIST);
        response.success(ERROR_MSG.ERR_USER_ID_MUST_EXIST);
        return;
    }

    var user_obj;
    var use_token = request.params.use_token;
    if (typeof(use_token) != "undefined" && 1 === use_token) {
        user_obj = request.user;
        if (typeof(user_obj) == "undefined" || user_obj.length === 0) {
            console.log("kongcv_verify_purse_passwd:",ERROR_MSG.ERR_USER_SESSIONTOKEN_MUST_EXIST);
            response.success(ERROR_MSG.ERR_USER_SESSIONTOKEN_MUST_EXIST);
            return;
        }

        if (user_id != user_obj.id) {
            console.log("kongcv_verify_purse_passwd:",ERROR_MSG.ERR_USERID_SESSIONTOKEN_UNMATCHED);
            response.success(ERROR_MSG.ERR_USERID_SESSIONTOKEN_UNMATCHED);
            return;
        }
    }
    else {
        user_obj = new AV.User();
        user_obj.id = user_id;
    }

    var passwd = request.params.passwd;
    if (typeof(passwd) == "undefined" || passwd.length === 0) {
        console.log("kongcv_verify_purse_passwd:",ERROR_MSG.ERR_PASSWD_MUST_EXIST);
        response.success(ERROR_MSG.ERR_PASSWD_MUST_EXIST);
        return;
    }
    
    var purse_query = new AV.Query(kongcv_purse_cls);
    purse_query.equalTo("user", user_obj);
    purse_query.find({
        success : function(results) { 
            if (0 === results.length) {
                console.log("kongcv_verify_purse_passwd:",ERROR_MSG.ERR_BANK_CARD_MUST_EXIST);
                response.success(ERROR_MSG.ERR_BANK_CARD_MUST_EXIST);
                return;
            }

            var purse_obj = results[0];
            var purse_passwd = purse_obj.get("passwd");
            if (purse_passwd != passwd) {
                console.log("kongcv_verify_purse_passwd:",ERROR_MSG.ERR_VERIFY_PASSWD);
                response.success(ERROR_MSG.ERR_VERIFY_PASSWD);
                return;
            }
            
            response.success(RESULT_MSG.RET_OK);
            return;
        },
        error : function(error) {
            console.log("kongcv_verify_purse_passwd:",error);
            response.error(error);
            return;
        }
    }); 
});

/**
 * brief   : get purse info
 * @param  : request - {"user_id":"xxxxx","use_token":1}
 *           response - return success or error
 * @return : RET_OK - success
 *           {"result":"{\"state\":\"ok\",\"code\":1,\"msg\":\"成功}"}
 *           error
 *           {"code":142,"error":"xxxxxx"}
 */
AV.Cloud.define("kongcv_get_purse", function(request, response) {
    var user_id = request.params.user_id;
    if (typeof(user_id) == "undefined" || user_id.length === 0) {
        console.log("kongcv_get_purse:",ERROR_MSG.ERR_USER_ID_MUST_EXIST);
        response.success(ERROR_MSG.ERR_USER_ID_MUST_EXIST);
        return;
    }

    var user_obj;
    var use_token = request.params.use_token;
    if (typeof(use_token) != "undefined" && 1 === use_token) {
        user_obj = request.user;
        if (typeof(user_obj) == "undefined" || user_obj.length === 0) {
            console.log("kongcv_get_purse:",ERROR_MSG.ERR_USER_SESSIONTOKEN_MUST_EXIST);
            response.success(ERROR_MSG.ERR_USER_SESSIONTOKEN_MUST_EXIST);
            return;
        }

        if (user_id != user_obj.id) {
            console.log("kongcv_get_purse:",ERROR_MSG.ERR_USERID_SESSIONTOKEN_UNMATCHED);
            response.success(ERROR_MSG.ERR_USERID_SESSIONTOKEN_UNMATCHED);
            return;
        }
    }
    else {
        user_obj = new AV.User();
        user_obj.id = user_id;
    }

    var purse_query = new AV.Query(kongcv_purse_cls);
    purse_query.equalTo("user", user_obj);
    purse_query.find({
        success : function(results) { 
            response.success(results);
            return;
        },
        error : function(error) {
            console.log("kongcv_get_purse:",error);
            response.error(error);
            return;
        }
    }); 
});

/**
 * brief   : put purse info
 * @param  : request - {"user_id":"xxxx", "bank_card":{"bank":"xxx","card":"xxxxx","name":"xxx","bank_icon_url":"xxxxx"},"passwd":"xxxx", "action":"new","use_token":1}
 *           response - return success or error
 * @return : RET_OK - success
 *           {"result":"{\"state\":\"ok\",\"code\":1,\"msg\":\"成功}"}
 *           error
 *           {"code":142,"error":"xxxxxx"}
 */
AV.Cloud.define("kongcv_put_purse", function(request, response) {
    var user_id = request.params.user_id;
    if (typeof(user_id) == "undefined" || user_id.length === 0) {
        console.log("kongcv_put_purse:",ERROR_MSG.ERR_USER_ID_MUST_EXIST);
        response.success(ERROR_MSG.ERR_USER_ID_MUST_EXIST);
        return;
    }

    var user_obj;
    var use_token = request.params.use_token;
    if (typeof(use_token) != "undefined" && 1 === use_token) {
        user_obj = request.user;
        if (typeof(user_obj) == "undefined" || user_obj.length === 0) {
            console.log("kongcv_put_purse:",ERROR_MSG.ERR_USER_SESSIONTOKEN_MUST_EXIST);
            response.success(ERROR_MSG.ERR_USER_SESSIONTOKEN_MUST_EXIST);
            return;
        }

        if (user_id != user_obj.id) {
            console.log("kongcv_put_purse:",ERROR_MSG.ERR_USERID_SESSIONTOKEN_UNMATCHED);
            response.success(ERROR_MSG.ERR_USERID_SESSIONTOKEN_UNMATCHED);
            return;
        }
    }
    else {
        user_obj = new AV.User();
        user_obj.id = user_id;
    }

    var action = request.params.action;
    if (typeof(action) == "undefined" || action.length === 0) {
        console.log("kongcv_put_purse:",ERROR_MSG.ERR_ACTION_MUST_EXIST);
        response.success(ERROR_MSG.ERR_ACTION_MUST_EXIST);
        return;
    }

    var bank_card = request.params.bank_card;
    if ("new" === action || "card" === action) {
        if (typeof(bank_card) == "undefined" || bank_card.length === 0) {
            console.log("kongcv_put_purse:",ERROR_MSG.ERR_BANK_CARD_MUST_EXIST);
            response.success(ERROR_MSG.ERR_BANK_CARD_MUST_EXIST);
            return;
        }
    }

    var passwd = request.params.passwd;
    if ("new" === action || "passwd" === action) {
        if (typeof(passwd) == "undefined" || passwd.length === 0) {
            console.log("kongcv_put_purse:",ERROR_MSG.ERR_PASSWD_MUST_EXIST);
            response.success(ERROR_MSG.ERR_PASSWD_MUST_EXIST);
            return;
        }
    }

    var bank_card_array = [];

    var kongcv_purse_obj = new kongcv_purse_cls();
    var purse_query = new AV.Query(kongcv_purse_cls);
    purse_query.equalTo("user", user_obj);
    purse_query.find({
        success : function(results) {
            if (1 === results.length) {
                kongcv_purse_obj = results[0];
                if ("card" === action) {
                    bank_card_array.push(bank_card);
                    kongcv_purse_obj.set("bank_card", bank_card_array);
                }
                else if ("passwd" === action) {
                    kongcv_purse_obj.set("passwd", passwd);
                }
                else if ("new" === action) {
                    /*bank_card_array.push(bank_card);
                    var tmp_bank_card = kongcv_purse_obj.get("bank_card"); 
                    if (typeof(tmp_bank_card) == "undefined" || tmp_bank_card.length === 0) {
                        kongcv_purse_obj.set("bank_card", bank_card_array);
                    }
                    else {
                        console.log("kongcv_put_purse:",ERROR_MSG.ERR_PURSE_CREATED);
                        response.success(ERROR_MSG.ERR_PURSE_CREATED);
                        return;
                    }

                    var tmp_passwd_card = kongcv_purse_obj.get("passwd"); 
                    if (typeof(tmp_passwd) == "undefined" || tmp_passwd.length === 0) {
                        kongcv_purse_obj.set("passwd", passwd);
                    }
                    else {
                        console.log("kongcv_put_purse:",ERROR_MSG.ERR_PURSE_CREATED);
                        response.success(ERROR_MSG.ERR_PURSE_CREATED);
                        return;
                    }*/
                    
                    bank_card_array.push(bank_card);
                    kongcv_purse_obj.set("bank_card", bank_card_array);
                    kongcv_purse_obj.set("passwd", passwd);
                }
                else {
                    console.log("kongcv_put_purse:",ERROR_MSG.ERR_INFO_FORMAT);
                    response.success(ERROR_MSG.ERR_INFO_FORMAT);
                    return;
                }
            }
            else if (0 === results.length) {
                if ("new" === action) {
                    bank_card_array.push(bank_card);
                    kongcv_purse_obj.set("bank_card", bank_card_array);
                    kongcv_purse_obj.set("passwd", passwd);
                    kongcv_purse_obj.set("user", user_obj);
                }
                else if ("system" === action) {
                    kongcv_purse_obj.set("user", user_obj);
                }
                else {
                    console.log("kongcv_put_purse:",ERROR_MSG.ERR_INFO_FORMAT);
                    response.success(ERROR_MSG.ERR_INFO_FORMAT);
                    return;
                }
            }

            kongcv_purse_obj.save().then(
                function(purse_obj) { 
                    response.success(RESULT_MSG.RET_OK);
                    return;
                },
                function(error) {
                    console.log("kongcv_put_purse:",error);
                    response.error(error);
                    return;
                }
            ); 
        },
        error : function(error) {
            console.log("kongcv_put_purse:",error);
            response.error(error);
            return;
        }
    }); 
});

/**
 * brief   : insert user_group
 * @param  : request - {"park_id":"xxxx","mobilePhoneNumber":"xxxx","mode":"curb"}
 *           response - return success or error
 * @return : RET_OK - success
 *           {"result":"{\"state\":\"ok\",\"code\":1,\"msg\":\"成功}"}
 *           error
 *           {"code":142,"error":"xxxxxx"}
 */
AV.Cloud.define("kongcv_insert_user_group", function(request, response) {
    var park_id = request.params.park_id;
    if (typeof(park_id) == "undefined" || park_id.length === 0) {
        console.log("kongcv_insert_user_group:",ERROR_MSG.ERR_PARK_ID_MUST_EXIST);
        response.success(ERROR_MSG.ERR_PARK_ID_MUST_EXIST);
        return;
    }

    var mobilePhoneNumber = request.params.mobilePhoneNumber; 
    if (typeof(mobilePhoneNumber) == "undefined" || mobilePhoneNumber.length === 0) {
        console.log("kongcv_insert_user_group:",ERROR_MSG.ERR_USER_MOBILE_MUST_EXIST);
        response.success(ERROR_MSG.ERR_USER_MOBILE_MUST_EXIST);
        return;
    }

    var mode = request.params.mode;
    if (typeof(mode) == "undefined" || mode.length === 0) {
        console.log("kongcv_insert_user_group:",ERROR_MSG.ERR_MODE_MUST_EXIST);
        response.success(ERROR_MSG.ERR_MODE_MUST_EXIST);
        return;
    }

    if ("curb" != mode) {
        console.log("kongcv_insert_user_group:",ERROR_MSG.ERR_MODE_MUST_EXIST);
        response.success(ERROR_MSG.ERR_MODE_NO_EXIST);
        return;
    }

    AV.User.logIn(user_0, user_0_ps, {
        success :function(user_admin) { 
            var user_query = new AV.Query(AV.User); 
            user_query.equalTo("mobilePhoneNumber", mobilePhoneNumber);
            user_query.find({
                success : function(results) {
                    if (0 === results.length) {
                        console.log("kongcv_insert_user_group:",ERROR_MSG.ERR_USER_NO_SIGNUP);
                        response.success(ERROR_MSG.ERR_USER_NO_SIGNUP);
                        return;
                    }

                    var user_obj = results[0];

                    var curb_query = new AV.Query(kongcv_park_curb_cls);
                    curb_query.get(park_id, {
                        success : function(park_obj) {
                            park_obj.add("user_group", user_obj);

                            park_obj.save().then(
                                function(result) {
                                    response.success(RESULT_MSG.RET_OK);
                                    return;
                                },
                                function(error) {
                                    console.log("kongcv_insert_user_group:",error);
                                    response.error(error);
                                    return;
                                }
                            );
                        },
                        error : function(error) {
                            console.log("kongcv_insert_user_group:",error);
                            response.error(error);
                            return;
                        }
                    });
                },
                error : function(error) {
                    console.log("kongcv_insert_user_group:",error);
                    response.error(error);
                    return;
                }
            });
        },
        error : function(error) {
            console.log("kongcv_insert_user_group:",error);
            response.error(error);
            return;
        } 
    });
});

/**
 * brief   : put user_group
 * @param  : request - {"park_id":"xxxx","user_group":["xxxx"],"mode":"curb"}
 *           response - return success or error
 * @return : RET_OK - success
 *           {"result":"{\"state\":\"ok\",\"code\":1,\"msg\":\"成功}"}
 *           error
 *           {"code":142,"error":"xxxxxx"}
 */
AV.Cloud.define("kongcv_put_user_group", function(request, response) {
    var park_id = request.params.park_id;
    if (typeof(park_id) == "undefined" || park_id.length === 0) {
        console.log("kongcv_put_user_group:",ERROR_MSG.ERR_PARK_ID_MUST_EXIST);
        response.success(ERROR_MSG.ERR_PARK_ID_MUST_EXIST);
        return;
    }
    
    var mode = request.params.mode;
    if (typeof(mode) == "undefined" || mode.length === 0) {
        console.log("kongcv_put_user_group:",ERROR_MSG.ERR_MODE_MUST_EXIST);
        response.success(ERROR_MSG.ERR_MODE_MUST_EXIST);
        return;
    }

    if ("curb" != mode) {
        console.log("kongcv_put_user_group:",ERROR_MSG.ERR_MODE_MUST_EXIST);
        response.success(ERROR_MSG.ERR_MODE_NO_EXIST);
        return;
    }
 
    var user_group = [];
    var user_group_array = request.params.user_group
    if (typeof(user_group_array) == "undefined") {
        console.log("kongcv_put_user_group:",ERROR_MSG.ERR_USERID_MUST_HAVE);
        response.success(ERROR_MSG.ERR_USERID_MUST_HAVE);
        return;
    }
    
    var user_group_num = user_group_array.length;

    for (var i = 0; i < user_group_num; i++) {
        var user_obj = new user_cls();
        user_obj.id = user_group_array[i];
        user_group.push(user_obj);
    } 

    var curb_query = new AV.Query(kongcv_park_curb_cls);
    curb_query.get(park_id, {
        success : function(park_obj) {
            park_obj.set("user_group", user_group);

            park_obj.save().then(
                function(result) {
                    response.success(RESULT_MSG.RET_OK);
                    return;
                },
                function(error) {
                    console.log("kongcv_put_user_group:",error);
                    response.error(error);
                    return;
                }
            );
        },
        error : function(error) {
            console.log("kongcv_put_user_group:",error);
            response.error(error);
            return;
        }
    });
});

/**
 * brief   : insert attach user
 * @param  : request - {"mobilePhoneNumber":"xxxxx", "mode":"curb"}
 *           response - return success or error
 * @return : RET_OK - success
 *           {"result":"{\"state\":\"ok\",\"code\":1,\"msg\":\"成功}"}
 *           error
 *           {"code":142,"error":"xxxxxx"}
 */
AV.Cloud.define("kongcv_insert_attach_user", function(request, response) {
    var user = request.user; 
    if (typeof(user) == "undefined" || user.length === 0) {
        console.log("kongcv_insert_attach_user:",ERROR_MSG.ERR_USER_SESSIONTOKEN_MUST_EXIST);
        response.success(ERROR_MSG.ERR_USER_SESSIONTOKEN_MUST_EXIST);
        return;
    }
    
    var mobilePhoneNumber = request.params.mobilePhoneNumber; 
    if (typeof(mobilePhoneNumber) == "undefined" || mobilePhoneNumber.length === 0) {
        console.log("kongcv_insert_attach_user:",ERROR_MSG.ERR_USER_MOBILE_MUST_EXIST);
        response.success(ERROR_MSG.ERR_USER_MOBILE_MUST_EXIST);
        return;
    }

    var mode = request.params.mode;
    if (typeof(mode) == "undefined" || mode.length === 0) {
        console.log("kongcv_insert_attach_user:",ERROR_MSG.ERR_MODE_MUST_EXIST);
        response.success(ERROR_MSG.ERR_MODE_MUST_EXIST);
        return;
    }

    if ("curb" != mode) {
        console.log("kongcv_insert_attach_user:",ERROR_MSG.ERR_MODE_MUST_EXIST);
        response.success(ERROR_MSG.ERR_MODE_NO_EXIST);
        return;
    }

    AV.User.logIn(user_0, user_0_ps, {
        success :function(user_admin) { 
            var user_query = new AV.Query(AV.User); 
            user_query.equalTo("mobilePhoneNumber", mobilePhoneNumber);
            user_query.find({
                success : function(results) {
                    if (0 === results.length) {
                        console.log("kongcv_insert_attach_user:",ERROR_MSG.ERR_USER_NO_SIGNUP);
                        response.success(ERROR_MSG.ERR_USER_NO_SIGNUP);
                        return;
                    }

                    var attach_user_obj = results[0];
                    user.set("attach_user", attach_user_obj);
                    user.save().then(
                        function(user_obj) {
                            response.success(RESULT_MSG.RET_OK);
                            return;
                        },
                        function(error) {
                            console.log("kongcv_insert_attach_user:",error);
                            response.error(error);
                            return;
                        }     
                    ); 
                },
                error : function(error) {
                    console.log("kongcv_insert_attach_user:",error);
                    response.error(error);
                    return;
                }
            });
        },
        error : function(error) {
            console.log("kongcv_insert_attach_user:",error);
            response.error(error);
            return;
        } 
    }); 
});
 
/**
 * brief   : insert invite code
 * @param  : request - {"invite_code":"xxxxx", "mobilePhoneNumber":"xxxxx", "user_id":"xxxx"}
 *           response - return success or error
 * @return : RET_OK - success
 *           {"result":"{\"state\":\"ok\",\"code\":1,\"msg\":\"成功}"}
 *           error
 *           {"code":142,"error":"xxxxxx"}
 */
AV.Cloud.define("kongcv_insert_invite_code", function(request, response) {
    var invite_code = request.params.invite_code;
    if (typeof(invite_code) == "undefined" || invite_code.length === 0) {
        console.log("kongcv_insert_invite_code:",RESULT_MSG.RET_FAIL);
        response.success(RESULT_MSG.RET_FAIL);
        return;
    }
    
    var mobilePhoneNumber = request.params.mobilePhoneNumber; 
    if (typeof(mobilePhoneNumber) == "undefined" || mobilePhoneNumber.length === 0) {
        console.log("kongcv_insert_invite_code:",ERROR_MSG.ERR_USER_MOBILE_MUST_EXIST);
        response.success(ERROR_MSG.ERR_USER_MOBILE_MUST_EXIST);
        return;
    }
 
    var user_id = request.params.user_id;
    if (typeof(user_id) == "undefined" || user_id.length === 0) {
        console.log("kongcv_insert_invite_code:",ERROR_MSG.ERR_USERID_MUST_HAVE);
        response.success(ERROR_MSG.ERR_USERID_MUST_HAVE);
        return;
    }

    var user_obj;
    var use_token = request.params.use_token;
    if (typeof(use_token) != "undefined" && 1 === use_token) {
        user_obj = request.user; 
        if (typeof(user_obj) == "undefined" || user_obj.length === 0) {
            console.log("kongcv_insert_invite_code:",ERROR_MSG.ERR_USER_SESSIONTOKEN_MUST_EXIST);
            response.success(ERROR_MSG.ERR_USER_SESSIONTOKEN_MUST_EXIST);
            return;
        }

        if (user_id != user_obj.id) {
            console.log("kongcv_insert_invite_code:",ERROR_MSG.ERR_USERID_SESSIONTOKEN_UNMATCHED);
            response.success(ERROR_MSG.ERR_USERID_SESSIONTOKEN_UNMATCHED);
            return;
        }
    }
    else { 
        user_obj = new user_cls();
        user_obj.id = user_id; 
    }
 
    var kongcv_market_coupon_query = new AV.Query(kongcv_market_coupon_cls);
    kongcv_market_coupon_query.equalTo("invite_code", invite_code);
    kongcv_market_coupon_query.include("coupon");

    kongcv_market_coupon_query.find({
        success : function(results) {
            if (0 === results.length) {
                response.success(RESULT_MSG.RET_FAIL);
                return;
            }

            var coupon = results[0].get("coupon");
            
            var kongcv_invite_code_obj = new kongcv_invite_code_cls();
            kongcv_invite_code_obj.set("invite_code", invite_code);
            kongcv_invite_code_obj.set("mobile", mobilePhoneNumber);
            kongcv_invite_code_obj.set("user", user_obj);
            kongcv_invite_code_obj.set("coupon", coupon);
            kongcv_invite_code_obj.save().then(
                function() {
                    _kongcv_insert_user_coupon(response, user_obj, coupon, 0);
                    
                    response.success(RESULT_MSG.RET_OK);
                    return;
                },
                function(error) {
                    console.log("kongcv_insert_invite_code:",error);
                    
                    if (137 === error.code) {
                        console.log("kongcv_insert_invite_code:",ERROR_MSG.ERR_SAME_COUPON_EXIST);
                        response.success(ERROR_MSG.ERR_SAME_COUPON_EXIST);
                    }
                    else {
                        response.error(error);
                    }

                    return;
                }
            ); 
        },
        error : function(error) {
            console.log("kongcv_insert_invite_code:",error);
            response.error(error);
            return;
        }
    }); 
});

/**
 * brief   : insert exception
 * @param  : request - {"user_id":"xxx","device_type":"xxxxx", "version":"xxxxx","exception":"xxxx"}
 *           response - return success or error
 * @return : RET_OK - success
 *           {"result":"{\"state\":\"ok\",\"code\":1,\"msg\":\"成功}"}
 *           error
 *           {"code":142,"error":"xxxxxx"}
 */
AV.Cloud.define("kongcv_insert_exception", function(request, response) {
    var user_id = request.params.user_id;
    if (typeof(user_id) == "undefined" || user_id.length === 0) {
        console.log("kongcv_insert_exception:",ERROR_MSG.ERR_USERID_MUST_HAVE);
        response.success(ERROR_MSG.ERR_USERID_MUST_HAVE);
        return;
    }
    
    var device_type = request.params.device_type;
    if (typeof(device_type) == "undefined" || device_type.length === 0) {
        console.log("kongcv_insert_exception:",ERROR_MSG.ERR_DEVICE_TYPE_MUST_EXIST);
        response.success(ERROR_MSG.ERR_DEVICE_TYPE_MUST_EXIST);
        return;
    }
    
    var version = request.params.version; 
    if (typeof(version) == "undefined" || version.length === 0) {
        console.log("kongcv_insert_exception:",ERROR_MSG.ERR_VERSION_MUST_HAVE);
        response.success(ERROR_MSG.ERR_VERSION_MUST_HAVE);
        return;
    }

    var exception = request.params.exception; 
    if (typeof(exception) == "undefined" || exception.length === 0) {
        console.log("kongcv_insert_exception:",ERROR_MSG.ERR_EXCEPTION_MUST_HAVE);
        response.success(ERROR_MSG.ERR_EXCEPTION_MUST_HAVE);
        return;
    }
            
    user_obj = new user_cls();
    user_obj.id = user_id;
    
    var kongcv_exception_obj = new kongcv_exception_cls();
    kongcv_exception_obj.set("device_type", device_type);
    kongcv_exception_obj.set("version", version);
    kongcv_exception_obj.set("exception", exception);
    kongcv_exception_obj.set("user", user_obj);

    kongcv_exception_obj.save().then(
        function() {
            response.success(RESULT_MSG.RET_OK);
            return;
        },
        function(error) {
            console.log("kongcv_insert_invite_code:",error);
            response.success(error);
            return;
        }
    );
});
 
/**
 * brief   : get user list
 * @param  : request - {"device_type":"ios" "skip":0, "limit":10, "city":"xxxx", "start_date":"2016-01-01 00:00:00","end_date":"2016-02-01 00:00:00"}
 *           response - return success or error
 * @return : RET_OK - success
 *           {"result":"{\"state\":\"ok\",\"code\":1,\"msg\":\"成功}"}
 *           error
 *           {"code":142,"error":"xxxxxx"}
 */
AV.Cloud.define("kongcv_manage_get_user_list", function(request, response) {
    var skip = request.params.skip;
    if (typeof(skip) == "undefined" || skip.length === 0) {
        console.log("kongcv_manage_get_user_list:",ERROR_MSG.ERR_SKIP_MUST_EXIST);
        response.success(ERROR_MSG.ERR_SKIP_MUST_EXIST);
        return;
    }
    
    var limit = request.params.limit;
    if (typeof(limit) == "undefined" || limit.length === 0) {
        console.log("kongcv_manage_get_user_list:",ERROR_MSG.ERR_LIMIT_MUST_EXIST);
        response.success(ERROR_MSG.ERR_LIMIT_MUST_EXIST);
        return;
    }
    
    var device_type = request.params.device_type;
    var city = request.params.city;
    var start_date = request.params.start_date;
    var end_date = request.params.end_date;

    AV.User.logIn(user_0, user_0_ps, {
        success :function(user_admin) { 
            var user_query = new AV.Query(AV.User); 
 
            if (typeof(city) != "undefined" && city.length > 0) {
                user_query.equalTo("city", city);
            }

            if (typeof(device_type) != "undefined" && device_type.length > 0) {
                user_query.equalTo("device_type", device_type);
            }

            if ((typeof(start_date) != "undefined" && start_date.length > 0) && (typeof(end_date) != "undefined" && end_date.length > 0)) {
                var query_start_date = new Date(start_date);
                var query_end_date = new Date(end_date);
                user_query.greaterThanOrEqualTo("createdAt", query_start_date);
                user_query.lessThan("createdAt", query_end_date);
            }

            user_query.skip(skip);
            user_query.limit(limit);
            user_query.find({
                success : function(results) {
                    response.success(results);
                    return;
                },
                error : function(error) {
                    console.log("kongcv_manage_get_user_list:",error);
                    response.error(error);
                    return;
                }
            });
        },
        error : function(error) {
            console.log("kongcv_manage_get_user_list:",error);
            response.error(error);
            return;
        }
    });
});

/**
 * brief   : get user count
 * @param  : request - {"device_type":"ios","city":"xxxx", "start_date":"2016-01-01 00:00:00","end_date":"2016-02-01 00:00:00"}
 *           response - return success or error
 * @return : RET_OK - success
 *           {"result":"{\"state\":\"ok\",\"code\":1,\"msg\":\"成功}"}
 *           error
 *           {"code":142,"error":"xxxxxx"}
 */
AV.Cloud.define("kongcv_manage_get_user_count", function(request, response) {
    var device_type = request.params.device_type;
    var city = request.params.city; 
    var start_date = request.params.start_date;
    var end_date = request.params.end_date;

    AV.User.logIn(user_0, user_0_ps, {
        success :function(user_admin) { 
            var user_query = new AV.Query(AV.User); 
            if (typeof(city) != "undefined" && city.length > 0) {
                user_query.equalTo("city", city);
            }
            
            if (typeof(device_type) != "undefined" && device_type.length > 0) {
                user_query.equalTo("device_type", device_type);
            }

            if ((typeof(start_date) != "undefined" && start_date.length > 0) && (typeof(end_date) != "undefined" && end_date.length > 0)) {
                var query_start_date = new Date(start_date);
                var query_end_date = new Date(end_date);
                user_query.greaterThanOrEqualTo("createdAt", query_start_date);
                user_query.lessThan("createdAt", query_end_date);
            }

            user_query.count().then(
                function(count) {
                    response.success(count);
                    return;
                },
                function(error) {
                    console.log("kongcv_manage_get_user_count:",error);
                    response.error(error);
                    return;
                }
            );
        },
        error : function(error) {
            console.log("kongcv_manage_get_user_count:",error);
            response.error(error);
            return;
        }
    });
});

/**
 * brief   : get user from mobile
 * @param  : request - {"mobilePhoneNumber":"xxxxx"}
 *           response - return success or error
 * @return : RET_OK - success
 *           {"result":"{\"state\":\"ok\",\"code\":1,\"msg\":\"成功}"}
 *           error
 *           {"code":142,"error":"xxxxxx"}
 */
AV.Cloud.define("kongcv_manage_mobile_2_user", function(request, response) {
    var mobilePhoneNumber = request.params.mobilePhoneNumber; 
    if (typeof(mobilePhoneNumber) == "undefined" || mobilePhoneNumber.length === 0) {
        console.log("kongcv_manage_mobile_2_user:",ERROR_MSG.ERR_USER_MOBILE_MUST_EXIST);
        response.success(ERROR_MSG.ERR_USER_MOBILE_MUST_EXIST);
        return;
    }
    
    AV.User.logIn(user_0, user_0_ps, {
        success :function(user_admin) { 
            var user_query = new AV.Query(AV.User); 
            user_query.equalTo("mobilePhoneNumber", mobilePhoneNumber);
            user_query.find({
                success : function(results) {
                    if (0 === results.length) {
                        console.log("kongcv_manage_mobile_2_user:",ERROR_MSG.ERR_USER_NO_SIGNUP);
                        response.success(ERROR_MSG.ERR_USER_NO_SIGNUP);
                        return;
                    }

                    var user_obj = results[0];
                    response.success(user_obj);
                    return;
                },
                error : function(error) {
                    console.log("kongcv_manage_mobile_2_user:",error);
                    response.error(error);
                    return;
                }
            });
        },
        error : function(error) {
            console.log("kongcv_manage_mobile_2_user:",error);
            response.error(error);
            return;
        }
    });
});
 
/**
 * brief   : get trade action data
 * @param  : request - {"skip":0, "limit":10, "action":[1,4]}
 *           response - return result or error
 * @return : RET_OK - success
 *           {"result":"{\"state\":\"ok\",\"code\":1,\"msg\":\"成功}"}
 *           RET_ERROR - system error
 *           {"code":601,"error":"xxxxxx"}
 */
AV.Cloud.define("kongcv_manage_get_trade_action", function(request, response) {  
    var skip = request.params.skip;
    if (typeof(skip) == "undefined" || skip.length === 0) {
        console.log("kongcv_manage_get_trade_action:",ERROR_MSG.ERR_SKIP_MUST_EXIST);
        response.success(ERROR_MSG.ERR_SKIP_MUST_EXIST);
        return;
    }
    
    var limit = request.params.limit;
    if (typeof(limit) == "undefined" || limit.length === 0) {
        console.log("kongcv_manage_get_trade_action:",ERROR_MSG.ERR_LIMIT_MUST_EXIST);
        response.success(ERROR_MSG.ERR_LIMIT_MUST_EXIST);
        return;
    }

    var action = request.params.action;
    if (typeof(action) == "undefined" || action.length === 0) {
        console.log("kongcv_manage_get_trade_action:",ERROR_MSG.ERR_ACTION_MUST_EXIST);
        response.success(ERROR_MSG.ERR_ACTION_MUST_EXIST);
        return;
    }

    var trade_query = new AV.Query(kongcv_trade_cls);
    trade_query.descending("createdAt");
    trade_query.containedIn("action", action);
    trade_query.skip(skip);
    trade_query.limit(limit);
    trade_query.include("user");

    trade_query.find({
        success : function(results) {
            for (var i = 0; i < results.length; i++) { 
                results[i].set("user", JSON.stringify(results[i].get("user")));
            }

            response.success(results);
            return;
        },
        error : function(error) {
            console.log("kongcv_manage_get_trade_action:",error);
            response.error(error);
            return;
        }
    });
});

/**
 * brief   : set trade action
 * @param  : request - {"trade_id":"xxxx", "action":1}
 *           response - return result or error
 * @return : RET_OK - success
 *           {"result":"{\"state\":\"ok\",\"code\":1,\"msg\":\"成功}"}
 *           RET_ERROR - system error
 *           {"code":601,"error":"xxxxxx"}
 */
AV.Cloud.define("kongcv_manage_set_trade_action", function(request, response) {
    var trade_id = request.params.trade_id;
    if (typeof(trade_id) == "undefined" || trade_id.length === 0) {
        console.log("kongcv_manage_set_trade_action:",ERROR_MSG.ERR_TRADE_ID_MUST_EXIST);
        response.success(ERROR_MSG.ERR_TRADE_ID_MUST_EXIST);
        return;
    }
    
    var action = request.params.action;
    if (typeof(action) == "undefined" || action.length === 0) {
        console.log("kongcv_manage_set_trade_action:",ERROR_MSG.ERR_ACTION_MUST_EXIST);
        response.success(ERROR_MSG.ERR_ACTION_MUST_EXIST);
        return;
    }

    var kongcv_trade_obj = new kongcv_trade_cls();
    kongcv_trade_obj.id = trade_id;
    
    if (1 === action) {
        kongcv_trade_obj.set("action", 4);
    }
    else {
        console.log("kongcv_manage_set_trade_action:",ERROR_MSG.ERR_INFO_FORMAT);
        response.success(ERROR_MSG.ERR_INFO_FORMAT);
        return;
    }

    kongcv_trade_obj.save().then(
        function(trade_obj) {
            response.success(RESULT_MSG.RET_OK);
            return;
        },
        function(error) {
            console.log("kongcv_manage_set_trade_action::",error);
            response.error(error);
            return;
        }     
    ); 

});

/**
 * brief   : manage signup
 * @param  : request - {"user_name":"xxxx", "passwd":"xxxx", "role":"xxxx"}
 *           response - return result or error
 * @return : RET_OK - success
 *           {"result":"{\"state\":\"ok\",\"code\":1,\"msg\":\"成功}"}
 *           RET_ERROR - system error
 *           {"code":601,"error":"xxxxxx"}
 */
AV.Cloud.define("kongcv_manage_signup", function(request, response) {
    var user_name = request.params.user_name;
    if (typeof(user_name) == "undefined" || user_name.length === 0) {
        console.log("kongcv_manage_signup:",ERROR_MSG.ERR_USERNAME_MUST_EXIST);
        response.success(ERROR_MSG.ERR_USERNAME_MUST_EXIST);
        return;
    }

    var passwd = request.params.passwd;
    if (typeof(passwd) == "undefined" || passwd.length === 0) {
        console.log("kongcv_manage_signup:",ERROR_MSG.ERR_PASSWD_MUST_EXIST);
        response.success(ERROR_MSG.ERR_PASSWD_MUST_EXIST);
        return;
    }
    
    var role = request.params.role;
    if (typeof(role) == "undefined" || role.length === 0) {
        console.log("kongcv_manage_signup:",ERROR_MSG.ERR_ROLE_MUST_EXIST);
        response.success(ERROR_MSG.ERR_ROLE_MUST_EXIST);
        return;
    }

    AV.User.logIn(user_name, passwd, {
        success :function(user) {
            var role_id = user._serverData.role;
            
            if ("release_market" === role) {
                if (release_marketer_role_id === role_id) {
                    response.success(RESULT_MSG.RET_OK);
                    return;
                }
            }
            else if ("release_financial" === role) {
                if (release_financial_role_id === role_id) {
                    response.success(RESULT_MSG.RET_OK);
                    return;
                }
            }
            if ("debug_market" === role) {
                if (debug_marketer_role_id === role_id) {
                    response.success(RESULT_MSG.RET_OK);
                    return;
                }
            }
            else if ("debug_financial" === role) {
                if (debug_financial_role_id === role_id) {
                    response.success(RESULT_MSG.RET_OK);
                    return;
                }
            }
            else {
                console.log("kongcv_manage_signup:", ERROR_MSG.ERR_INFO_FORMAT);
                response.success(ERROR_MSG.ERR_INFO_FORMAT);
                return;
            }
        },
        error : function(error) {
            console.log("kongcv_manage_signup:",error);
            response.success(RESULT_MSG.RET_FAIL);
            return;
        }
    });
});
 
/**
 * brief   : get month trade list
 * @param  : request - {"user_id":"xxxxx", "start_date":"2016-01-01 00:00:00","end_date":"2016-02-01 00:00:00","role":"customer","skip":0, "limit":10,"mode":"community", "pay_state":0, "action":"list", "use_token":1}
 *           response - return result or error
 * @return : RET_OK - success
 *           {"result":"{\"state\":\"ok\",\"code\":1,\"msg\":\"成功}"}
 *           RET_ERROR - system error
 *           {"code":601,"error":"xxxxxx"}
 */
AV.Cloud.define("kongcv_manage_get_trade_data", function(request, response) {
    var user_id = request.params.user_id;
    if (typeof(user_id) == "undefined" || user_id.length === 0) {
        console.log("kongcv_manage_get_trade_data:",ERROR_MSG.ERR_USER_ID_MUST_EXIST);
        response.success(ERROR_MSG.ERR_USER_ID_MUST_EXIST);
        return;
    }

    if ("0" != user_id) {
        if (typeof(use_token) != "undefined" && 1 === use_token) {
            user_obj = request.user;
            if (typeof(user_obj) == "undefined" || user_obj.length === 0) {
                console.log("kongcv_manage_get_trade_data:",ERROR_MSG.ERR_USER_SESSIONTOKEN_MUST_EXIST);
                response.success(ERROR_MSG.ERR_USER_SESSIONTOKEN_MUST_EXIST);
                return;
            }

            if (user_id != user_obj.id) {
                console.log("kongcv_manage_get_trade_data:",ERROR_MSG.ERR_USERID_SESSIONTOKEN_UNMATCHED);
                response.success(ERROR_MSG.ERR_USERID_SESSIONTOKEN_UNMATCHED);
                return;
            }
        }
        else { 
            user_obj = new user_cls();
            user_obj.id = user_id;
        }
    }

    var role = request.params.role;
    if (typeof(role) == "undefined" || role.length === 0) {
        console.log("kongcv_manage_get_trade_data:",ERROR_MSG.ERR_USER_SESSIONTOKEN_MUST_EXIST);
        response.success(ERROR_MSG.ERR_ROLE_MUST_EXIST);
        return;
    }

    var start_date = request.params.start_date;
    var end_date = request.params.end_date;

    var skip = request.params.skip;
    if (typeof(skip) == "undefined" || skip.length === 0) {
        console.log("kongcv_manage_get_trade_data:",ERROR_MSG.ERR_SKIP_MUST_EXIST);
        response.success(ERROR_MSG.ERR_SKIP_MUST_EXIST);
        return;
    }
    
    var limit = request.params.limit;
    if (typeof(limit) == "undefined" || limit.length === 0) {
        console.log("kongcv_manage_get_trade_data:",ERROR_MSG.ERR_LIMIT_MUST_EXIST);
        response.success(ERROR_MSG.ERR_LIMIT_MUST_EXIST);
        return;
    }

    var mode = request.params.mode;
    if (typeof(mode) == "undefined" || mode.length === 0) {
        console.log("kongcv_manage_get_trade_data:",ERROR_MSG.ERR_MODE_MUST_EXIST);
        response.success(ERROR_MSG.ERR_MODE_MUST_EXIST);
        return;
    }

    var pay_state = request.params.pay_state;
    if (typeof(pay_state) == "undefined" || pay_state.length === 0) {
        console.log("kongcv_manage_get_trade_data:",ERROR_MSG.ERR_PAY_STATE_MUST_EXIST);
        response.success(ERROR_MSG.ERR_PAY_STATE_MUST_EXIST);
        return;
    }

    var action = request.params.action;
    if (typeof(action) == "undefined" || action.length === 0) {
        console.log("kongcv_manage_get_trade_data:",ERROR_MSG.ERR_ACTION_MUST_EXIST);
        response.success(ERROR_MSG.ERR_ACTION_MUST_EXIST);
        return;
    }

    var kongcv_park_cls;
    var trade_query = new AV.Query(kongcv_trade_cls); 
    if ("community" === mode) {
        trade_query.exists("park_community");
        trade_query.include("park_community");
        kongcv_park_cls = kongcv_park_community_cls;
    }
    else if ("curb" === mode) {
        trade_query.exists("park_curb");
        trade_query.include("park_curb");
        kongcv_park_cls = kongcv_park_curb_cls;
    }
    else {
        console.log("kongcv_manage_get_trade_data:",ERROR_MSG.ERR_INFO_FORMAT);
        response.success(ERROR_MSG.ERR_INFO_FORMAT);
        return;
    }
  
    if ("0" != user_id) {
        if ("customer" === role) {
            trade_query.equalTo("user", user_obj);
        }
        else if ("hirer" === role) {
            trade_query.equalTo("hirer", user_obj);
        }
        else if ("hirer_second" === role) {
            var park_query = new AV.Query(kongcv_park_cls); 
            park_query.equalTo("user_group", user_obj);

            if ("community" === mode) {
                trade_query.matchesQuery("park_community", park_query);
            }
            else if ("curb" === mode) {
                trade_query.matchesQuery("park_curb", park_query);
            }  
        }
        else {
            console.log("kongcv_manage_get_trade_data:",ERROR_MSG.ERR_INFO_FORMAT);
            response.success(ERROR_MSG.ERR_INFO_FORMAT);
            return;
        }
    }
    
    if (1 === pay_state) {
      trade_query.greaterThanOrEqualTo("pay_state", 1);
    }
    
    if ((typeof(start_date) != "undefined" && start_date.length > 0) && (typeof(end_date) != "undefined" && end_date.length > 0)) {
        var query_start_date = new Date(start_date);
        var query_end_date = new Date(end_date);
        trade_query.greaterThanOrEqualTo("hire_start", query_start_date);
        trade_query.lessThan("hire_end", query_end_date);
    }

    trade_query.descending("createdAt");
    trade_query.select("-charge_date");
    trade_query.select("-trade_bill_id");
    trade_query.include("hirer");
    trade_query.include("user");
    trade_query.include("hire_method");
     
    if ("list" === action) {
        trade_query.skip(skip);
        trade_query.limit(limit);
        trade_query.find({
            success : function(results) {
                for (var i = 0; i < results.length; i++) {
                    results[i].set("user", JSON.stringify(results[i].get("user")));
                    results[i].set("hirer", JSON.stringify(results[i].get("hirer")));
                    results[i].set("hire_method", JSON.stringify(results[i].get("hire_method")));

                    if ("community" === mode) {
                        results[i].set("park_community", JSON.stringify(results[i].get("park_community")));
                    }
                    else if ("curb" === mode) {
                        results[i].set("park_curb", JSON.stringify(results[i].get("park_curb")));
                    }
                }

                response.success(results);
                return;
            },
            error : function(error) {
                console.log("kongcv_manage_get_trade_data:",error);
                response.error(error);
                return;
            }
        });
    }
    else if ("count" === action) {
        trade_query.count().then(
            function(count) {
                response.success(count);
                return;
            },
            function(error) {
                console.log("kongcv_manage_get_trade_data:",error);
                response.error(error);
                return;
            }
        );
    }
});

/**
 * brief   : manage get park list
 * @param  : request - {"user_id":"xxxx","start_date":"2016-01-01 00:00:00","end_date":"2016-02-01 00:00:00","skip":0, "limit":10,"mode":"community","action":"list"}
 *           response - return result or error
 * @return : RET_OK - success
 *           {"result":"{\"state\":\"ok\",\"code\":1,\"msg\":\"成功}"}
 *           RET_ERROR - system error
 *           {"code":601,"error":"xxxxxx"}
 */
AV.Cloud.define("kongcv_manage_get_park_data", function(request, response) {
    var user_id = request.params.user_id;
    var query_month = request.params.query_month;
    var start_date = request.params.start_date;
    var end_date = request.params.end_date;

    var skip = request.params.skip;
    if (typeof(skip) == "undefined" || skip.length === 0) {
        console.log("kongcv_manage_get_park_data:",ERROR_MSG.ERR_SKIP_MUST_EXIST);
        response.success(ERROR_MSG.ERR_SKIP_MUST_EXIST);
        return;
    }
    
    var limit = request.params.limit;
    if (typeof(limit) == "undefined" || limit.length === 0) {
        console.log("kongcv_manage_get_park_data:",ERROR_MSG.ERR_LIMIT_MUST_EXIST);
        response.success(ERROR_MSG.ERR_LIMIT_MUST_EXIST);
        return;
    }

    var mode = request.params.mode;
    if (typeof(mode) == "undefined" || mode.length === 0) {
        console.log("kongcv_manage_get_park_data:",ERROR_MSG.ERR_MODE_MUST_EXIST);
        response.success(ERROR_MSG.ERR_MODE_MUST_EXIST);
        return;
    }

    var action = request.params.action;
    if (typeof(action) == "undefined" || action.length === 0) {
        console.log("kongcv_manage_get_park_data:",ERROR_MSG.ERR_ACTION_MUST_EXIST);
        response.success(ERROR_MSG.ERR_ACTION_MUST_EXIST);
        return;
    }

    var kongcv_park_cls;
    if ("curb" === mode) {
        kongcv_park_cls = kongcv_park_curb_cls;
    }
    else if ("community" === mode) {
        kongcv_park_cls = kongcv_park_community_cls;
    }
    else if ("share" === mode) {
        kongcv_park_cls = kongcv_park_share_cls;
    }
    else {
        console.log("kongcv_manage_get_park_data:",ERROR_MSG.ERR_INFO_FORMAT);
        response.success(ERROR_MSG.ERR_INFO_FORMAT);
        return;
    }

    var park_query = new AV.Query(kongcv_park_cls); 
    if ("0" != user_id) {
        if (typeof(user_id) != "undefined" && user_id.length > 0) {
            var user_obj = new user_cls();
            user_obj.id = user_id;
            park_query.equalTo("user", user_obj);
        }
    }

    if ((typeof(start_date) != "undefined" && start_date.length > 0) && (typeof(end_date) != "undefined" && end_date.length > 0)) {
        var query_start_date = new Date(start_date);
        var query_end_date = new Date(end_date);
        park_query.greaterThanOrEqualTo("createdAt", query_start_date);
        park_query.lessThan("createdAt", query_end_date);
    }
    park_query.descending("createdAt");
    park_query.skip(skip);
    park_query.limit(limit);
    park_query.include("user");
    park_query.include("hire_method");
    
    //if ("community" === mode) {
    //    park_query.equalTo("personal", 1);
    //}
    if ("list" === action) {
        park_query.find({
            success : function(results) {
                if ("share" != mode) {
                    for (var i = 0; i < results.length; i++) {
                        results[i].set("hire_method", JSON.stringify(results[i].get("hire_method")));
                        results[i].set("user", JSON.stringify(results[i].get("user")));
                    }
                }

                response.success(results);
                return;
            },
            error : function(error) {
                console.log("kongcv_manage_get_park_data:",error);
                response.error(error);
                return;
            }
        });
    }
    else if ("count" === action) {
        park_query.count().then(
            function(count) {
                response.success(count);
                return;
            },
            function(error) {
                console.log("kongcv_manage_get_park_data:",error);
                response.error(error);
                return;
            }
        );
    }
});

/**
 * brief   : get invite code data
 * @param  : request - {"start_date":"2016-01-01 00:00:00","end_date":"2016-02-01 00:00:00","skip":0, "limit":10, "action":"list", "invite_code":"xxx"}
 *           response - return result or error
 * @return : RET_OK - success
 *           {"result":"{\"state\":\"ok\",\"code\":1,\"msg\":\"成功}"}
 *           RET_ERROR - system error
 *           {"code":601,"error":"xxxxxx"}
 */
AV.Cloud.define("kongcv_manage_get_invite_code_data", function(request, response) {
    var start_date = request.params.start_date;
    var end_date = request.params.end_date;
    
    var skip = request.params.skip;
    if (typeof(skip) == "undefined" || skip.length === 0) {
        console.log("kongcv_manage_get_invite_code_data:",ERROR_MSG.ERR_SKIP_MUST_EXIST);
        response.success(ERROR_MSG.ERR_SKIP_MUST_EXIST);
        return;
    }
    
    var limit = request.params.limit;
    if (typeof(limit) == "undefined" || limit.length === 0) {
        console.log("kongcv_manage_get_invite_code_data:",ERROR_MSG.ERR_LIMIT_MUST_EXIST);
        response.success(ERROR_MSG.ERR_LIMIT_MUST_EXIST);
        return;
    }
    
    var action = request.params.action;
    if (typeof(action) == "undefined" || action.length === 0) {
        console.log("kongcv_manage_get_invite_code_data:",ERROR_MSG.ERR_ACTION_MUST_EXIST);
        response.success(ERROR_MSG.ERR_ACTION_MUST_EXIST);
        return;
    }

    var invite_code = request.params.invite_code;

    var query = new AV.Query(kongcv_invite_code_cls); 
    if (typeof(invite_code) != "undefined" && invite_code.length > 0) {
        query.equalTo("invite_code", invite_code);
    }
    if ((typeof(start_date) != "undefined" && start_date.length > 0) && (typeof(end_date) != "undefined" && end_date.length > 0)) {
        var query_start_date = new Date(start_date);
        var query_end_date = new Date(end_date);
        query.greaterThanOrEqualTo("createdAt", query_start_date);
        query.lessThan("createdAt", query_end_date);
    }
    query.descending("updatedAt");
    query.skip(skip);
    query.limit(limit);

    if ("list" === action) {
        query.find({
            success : function(results) {
                response.success(results);
                return;
            },
            error : function(error) {
                console.log("kongcv_manage_get_invite_code_data:",error);
                response.error(error);
                return;
            }
        });
    }
    else if ("count" === action) {
        query.count().then(
            function(count) {
                response.success(count);
                return;
            },
            function(error) {
                console.log("kongcv_manage_get_invite_code_data:",error);
                response.error(error);
                return;
            }
        );
    }
});
 
/**
 * brief   : get feedback data
 * @param  : request - {"start_date":"2015-12-01 00:00:00","end_date":"2015-12-01 00:00:00""skip":0, "limit":10, "action":"list"}
 *           response - return result or error
 * @return : RET_OK - success
 *           {"result":"{\"state\":\"ok\",\"code\":1,\"msg\":\"成功}"}
 *           RET_ERROR - system error
 *           {"code":601,"error":"xxxxxx"}
 */
AV.Cloud.define("kongcv_manage_get_feedback_data", function(request, response) {
    var start_date = request.params.start_date;
    var end_date = request.params.end_date;

    var skip = request.params.skip;
    if (typeof(skip) == "undefined" || skip.length === 0) {
        console.log("kongcv_manage_get_feedback_data:",ERROR_MSG.ERR_SKIP_MUST_EXIST);
        response.success(ERROR_MSG.ERR_SKIP_MUST_EXIST);
        return;
    }
    
    var limit = request.params.limit;
    if (typeof(limit) == "undefined" || limit.length === 0) {
        console.log("kongcv_manage_get_feedback_data:",ERROR_MSG.ERR_LIMIT_MUST_EXIST);
        response.success(ERROR_MSG.ERR_LIMIT_MUST_EXIST);
        return;
    }
    
    var action = request.params.action;
    if (typeof(action) == "undefined" || action.length === 0) {
        console.log("kongcv_manage_get_feedback_data:",ERROR_MSG.ERR_ACTION_MUST_EXIST);
        response.success(ERROR_MSG.ERR_ACTION_MUST_EXIST);
        return;
    }

    var query = new AV.Query(kongcv_feedback_cls); 
    if ((typeof(start_date) != "undefined" && start_date.length > 0) && (typeof(end_date) != "undefined" && end_date.length > 0)) {
        var query_start_date = new Date(start_date);
        var query_end_date = new Date(end_date);
        query.greaterThanOrEqualTo("createdAt", query_start_date);
        query.lessThan("createdAt", query_end_date);
    }
    query.descending("createdAt");
    query.skip(skip);
    query.limit(limit);
    query.include("user");

    if ("list" === action) {
        query.find({
            success : function(results) {
                for (var i = 0; i < results.length; i++) {
                    results[i].set("user", JSON.stringify(results[i].get("user")));
                }

                response.success(results);
                return;
            },
            error : function(error) {
                console.log("kongcv_manage_get_feedback_data:",error);
                response.error(error);
                return;
            }
        });
    }
    else if ("count" === action) {
        query.count().then(
            function(count) {
                response.success(count);
                return;
            },
            function(error) {
                console.log("kongcv_manage_get_feedback_data:",error);
                response.error(error);
                return;
            }
        );
    }
});

/**
 * brief   : get pushmessage data
 * @param  : request - {"start_date":"2015-12-01 00:00:00","end_date":"2015-12-01 00:00:00","skip":0, "limit":10, "action":"list","mode":"xxx"}
 *           response - return result or error
 * @return : RET_OK - success
 *           {"result":"{\"state\":\"ok\",\"code\":1,\"msg\":\"成功}"}
 *           RET_ERROR - system error
 *           {"code":601,"error":"xxxxxx"}
 */
AV.Cloud.define("kongcv_manage_get_pushmessage_data", function(request, response) {
    var start_date = request.params.start_date;
    var end_date = request.params.end_date;

    var skip = request.params.skip;
    if (typeof(skip) == "undefined" || skip.length === 0) {
        console.log("kongcv_manage_get_pushmessage_data:",ERROR_MSG.ERR_SKIP_MUST_EXIST);
        response.success(ERROR_MSG.ERR_SKIP_MUST_EXIST);
        return;
    }
    
    var limit = request.params.limit;
    if (typeof(limit) == "undefined" || limit.length === 0) {
        console.log("kongcv_manage_get_pushmessage_data:",ERROR_MSG.ERR_LIMIT_MUST_EXIST);
        response.success(ERROR_MSG.ERR_LIMIT_MUST_EXIST);
        return;
    }
    
    var action = request.params.action;
    if (typeof(action) == "undefined" || action.length === 0) {
        console.log("kongcv_manage_get_pushmessage_data:",ERROR_MSG.ERR_ACTION_MUST_EXIST);
        response.success(ERROR_MSG.ERR_ACTION_MUST_EXIST);
        return;
    }

    var mode = request.params.mode;
    
    var query = new AV.Query(kongcv_push_message_cls); 
    if ((typeof(start_date) != "undefined" && start_date.length > 0) && (typeof(end_date) != "undefined" && end_date.length > 0)) {
        var query_start_date = new Date(start_date);
        var query_end_date = new Date(end_date);
        query.greaterThanOrEqualTo("createdAt", query_start_date);
        query.lessThan("createdAt", query_end_date);
    }

    if (typeof(mode) != "undefined" && mode.length > 0) {
        query.equalTo("mode", mode);
    }
    query.descending("createdAt");
    query.skip(skip);
    query.limit(limit);

    if ("list" === action) {
        query.find({
            success : function(results) {
                response.success(results);
                return;
            },
            error : function(error) {
                console.log("kongcv_manage_get_pushmessage_data:",error);
                response.error(error);
                return;
            }
        });
    }
    else if ("count" === action) {
        query.count().then(
            function(count) {
                response.success(count);
                return;
            },
            function(error) {
                console.log("kongcv_manage_get_pushmessage_data:",error);
                response.error(error);
                return;
            }
        );
    }
});

/**
 * brief   : get search log
 * @param  : request - {"start_date":"2015-12-01 00:00:00","end_date":"2015-12-01 00:00:00","skip":0, "limit":10, "action":"list"}
 *           response - return result or error
 * @return : RET_OK - success
 *           {"result":"{\"state\":\"ok\",\"code\":1,\"msg\":\"成功}"}
 *           RET_ERROR - system error
 *           {"code":601,"error":"xxxxxx"}
 */
AV.Cloud.define("kongcv_manage_get_search_log", function(request, response) {
    var start_date = request.params.start_date;
    var end_date = request.params.end_date;

    var skip = request.params.skip;
    if (typeof(skip) == "undefined" || skip.length === 0) {
        console.log("kongcv_manage_get_search_log:",ERROR_MSG.ERR_SKIP_MUST_EXIST);
        response.success(ERROR_MSG.ERR_SKIP_MUST_EXIST);
        return;
    }
    
    var limit = request.params.limit;
    if (typeof(limit) == "undefined" || limit.length === 0) {
        console.log("kongcv_manage_get_search_log:",ERROR_MSG.ERR_LIMIT_MUST_EXIST);
        response.success(ERROR_MSG.ERR_LIMIT_MUST_EXIST);
        return;
    }
    
    var action = request.params.action;
    if (typeof(action) == "undefined" || action.length === 0) {
        console.log("kongcv_manage_get_search_log:",ERROR_MSG.ERR_ACTION_MUST_EXIST);
        response.success(ERROR_MSG.ERR_ACTION_MUST_EXIST);
        return;
    }
 
    var mode = request.params.mode;
    
    var query = new AV.Query(kongcv_log_location_search_cls); 
    if ((typeof(start_date) != "undefined" && start_date.length > 0) && (typeof(end_date) != "undefined" && end_date.length > 0)) {
        var query_start_date = new Date(start_date);
        var query_end_date = new Date(end_date);
        query.greaterThanOrEqualTo("createdAt", query_start_date);
        query.lessThan("createdAt", query_end_date);
    }
    
    if (typeof(mode) != "undefined" && mode.length > 0) {
        query.equalTo("mode", mode);
    }
    query.descending("createdAt");
    query.skip(skip);
    query.limit(limit);
    query.include("hire_method");

    if ("list" === action) {
        query.find({
            success : function(results) {
                for (var i = 0; i < results.length; i++) {
                    results[i].set("hire_method", JSON.stringify(results[i].get("hire_method")));
                }

                response.success(results);
                return;
            },
            error : function(error) {
                console.log("kongcv_manage_get_search_log:",error);
                response.error(error);
                return;
            }
        });
    }
    else if ("count" === action) {
        query.count().then(
            function(count) {
                response.success(count);
                return;
            },
            function(error) {
                console.log("kongcv_manage_get_search_log:",error);
                response.error(error);
                return;
            }
        );
    }
});

/**
* brief   : manage create coupon
* @param  : request -{"description" : "xxxx", "number":5, "limit_number":5,"name":"xxxx", "use_days":5,"type":"coupon_money","use_type":"curb"}
*           reponse - define error, result or system error
*           {"result":"{"state":"error", "code":20, "msg":"belong type必填}"}
* @return : success - RET_OK
*           error - define error or system error
*/
AV.Cloud.define('kongcv_manage_create_coupon', function(request, response) {
    var description = request.params.description;
    if (typeof(description) == "undefined" || description.length === 0) {
        console.log("kongcv_manage_create_coupon:",ERROR_MSG.ERR_COUPON_DESCRIPTION_MUST_EXIST);
        response.success(ERROR_MSG.ERR_COUPON_DESCRIPTION_MUST_EXIST);
        return;
    }

    var name = request.params.name;
    if (typeof(description) == "undefined" || description.length === 0) {
        console.log("kongcv_manage_create_coupon:",ERROR_MSG.ERR_COUPON_NAME_MUST_EXIST);
        response.success(ERROR_MSG.ERR_COUPON_NAME_MUST_EXIST);
        return;
    }

    var number = request.params.number;
    if (typeof(number) == "undefined" || number.length === 0) {
        console.log("kongcv_manage_create_coupon:",ERROR_MSG.ERR_COUPON_NUMBER_MUST_EXIST);
        response.success(ERROR_MSG.ERR_COUPON_NUMBER_MUST_EXIST);
        return;
    }

    var limit_number = request.params.limit_number;
 
    var use_days = request.params.use_days;
    if (typeof(use_days) == "undefined" || use_days.length === 0) {
        console.log("kongcv_manage_create_coupon:",ERROR_MSG.ERR_COUPON_USE_DAYS_MUST_EXIST);
        response.success(ERROR_MSG.ERR_COUPON_USE_DAYS_MUST_EXIST);
        return;
    } 
    

    var type = request.params.type;
    if (typeof(type) == "undefined" || type.length === 0) {
        console.log("kongcv_manage_create_coupon:",ERROR_MSG.ERR_COUPON_TYPE_MUST_EXIST);
        response.success(ERROR_MSG.ERR_COUPON_TYPE_MUST_EXIST);
        return;
    }
    
    var use_type = request.params.use_type;
    
    var kongcv_coupon_obj = new kongcv_coupon_cls(); 
    kongcv_coupon_obj.set("name", name);
    kongcv_coupon_obj.set("description", description);
    kongcv_coupon_obj.set("number", number);
    kongcv_coupon_obj.set("use_days", use_days);
    kongcv_coupon_obj.set("type", type);
    if (typeof(use_type) != "undefined" && use_type.length > 0) {
        kongcv_coupon_obj.set("use_type", use_type);
    }

    if (typeof(limit_number) != "undefined") {
        kongcv_coupon_obj.set("limit_number", limit_number);
    }

    kongcv_coupon_obj.save().then(
        function() {
            response.success(RESULT_MSG.RET_OK);
            return;
        },
        function(error) {
            console.log("kongcv_manage_create_coupon:",error);
            response.error(error);
            return;
        }
    );
});

/**
 * brief   : manage insert market coupon
 * @param  : request - {"invite_code":"xxxx","coupon_id":"xxx"}
 *           response - return result or error
 * @return : RET_OK - success
 *           {"result":"{\"state\":\"ok\",\"code\":1,\"msg\":\"成功}"}
 *           RET_ERROR - system error
 *           {"code":601,"error":"xxxxxx"}
 */
AV.Cloud.define("kongcv_manage_insert_market_coupon", function(request, response) {
    var invite_code = request.params.invite_code;
    if (typeof(invite_code) == "undefined" || invite_code.length === 0) {
        console.log("kongcv_manage_insert_market_coupon:",RESULT_MSG.RET_FAIL);
        response.success(RESULT_MSG.RET_FAIL);
        return;
    }

    var coupon_id = request.params.coupon_id;
    if (typeof(coupon_id) == "undefined" || coupon_id.length === 0) {
        console.log("kongcv_manage_insert_market_coupon:",ERROR_MSG.ERR_COUPON_ID_MUST_HAVE);
        response.success(ERROR_MSG.ERROR_MSG.ERR_COUPON_ID_MUST_HAVE);
        return; 
    }

    var kongcv_market_coupon_obj = new kongcv_market_coupon_cls();
    kongcv_market_coupon_obj.set("invite_code", invite_code);

    var kongcv_coupon_obj = new kongcv_coupon_cls();
    kongcv_coupon_obj.id = coupon_id;
    kongcv_market_coupon_obj.set("coupon", kongcv_coupon_obj);

    kongcv_market_coupon_obj.save().then(
        function(coupon_obj) {
            response.success(RESULT_MSG.RET_OK);
            return;
        },
        function(error) {
            console.log("kongcv_manage_insert_market_coupon:",error);
            response.error(error);
            return;
        }     
    ); 
});
 
/**
* brief   : manage get coupon template list
* @param  : request -{"skip":0,"limit":10}
*           reponse - define error, result or system error
*           {"result":"{"state":"error", "code":20, "msg":"belong type必填}"}
* @return : success - RET_OK
*           error - define error or system error
*/
AV.Cloud.define('kongcv_manage_get_coupon_template_list', function(request, response) { 
    var skip = request.params.skip;
    if (typeof(skip) == "undefined" || skip.length === 0) {
        console.log("kongcv_manage_get_coupon_template_list:",ERROR_MSG.ERR_SKIP_MUST_EXIST);
        response.success(ERROR_MSG.ERR_SKIP_MUST_EXIST);
        return;
    }
    
    var limit = request.params.limit;
    if (typeof(limit) == "undefined" || limit.length === 0) {
        console.log("kongcv_manage_get_coupon_template_list:",ERROR_MSG.ERR_LIMIT_MUST_EXIST);
        response.success(ERROR_MSG.ERR_LIMIT_MUST_EXIST);
        return;
    }

    var coupon_query = new AV.Query(kongcv_coupon_cls);
    coupon_query.skip(skip);
    coupon_query.limit(limit);
    coupon_query.find({
        success : function(results) { 
            response.success(results);
            return;
        },
        error : function(error) {
            console.log("kongcv_manage_get_coupon_template_list:",error);
            response.error(error);
            return;
        }
    });
});

/**
* brief   : manage get user coupon list
* @param  : request -{"coupon_id" : "555c28b8e4b0b7e69366b482","skip":0,"limit":10}
*           reponse - define error, result or system error
*           {"result":"{"state":"error", "code":20, "msg":"belong type必填}"}
* @return : success - RET_OK
*           error - define error or system error
*/
AV.Cloud.define('kongcv_manage_get_user_coupon_list', function(request, response) { 
    var skip = request.params.skip;
    if (typeof(skip) == "undefined" || skip.length === 0) {
        console.log("kongcv_manage_get_user_coupon_list:",ERROR_MSG.ERR_SKIP_MUST_EXIST);
        response.success(ERROR_MSG.ERR_SKIP_MUST_EXIST);
        return;
    }
    
    var limit = request.params.limit;
    if (typeof(limit) == "undefined" || limit.length === 0) {
        console.log("kongcv_manage_get_user_coupon_list:",ERROR_MSG.ERR_LIMIT_MUST_EXIST);
        response.success(ERROR_MSG.ERR_LIMIT_MUST_EXIST);
        return;
    }

    var coupon_id = request.params.coupon_id;
    var coupon_obj;

    var user_coupon_query = new AV.Query(kongcv_user_coupon_cls);
    if (typeof(coupon_id) != "undefined" && coupon_id.length > 0) {
        coupon_obj = new kongcv_coupon_cls();
        coupon_obj.id = coupon_id;
        user_coupon_query.equalTo("coupon", coupon_obj);
    }
    user_coupon_query.include("coupon");
    user_coupon_query.skip(skip);
    user_coupon_query.limit(limit);
    user_coupon_query.find({
        success : function(results) {
            for (i = 0; i < results.length; i++) {
                results[i].set("coupon", JSON.stringify(results[i].get("coupon")));
            }
            
            response.success(results);
            return;
        },
        error : function(error) {
            console.log("kongcv_manage_get_user_coupon_list:",error);
            response.error(error);
            return;
        }
    });
});

/**
* brief   : manage get market coupon list
* @param  : request -{"skip":0,"limit":10}
*           reponse - define error, result or system error
*           {"result":"{"state":"error", "code":20, "msg":"belong type必填}"}
* @return : success - RET_OK
*           error - define error or system error
*/
AV.Cloud.define('kongcv_manage_get_market_coupon_list', function(request, response) { 
    var skip = request.params.skip;
    if (typeof(skip) == "undefined" || skip.length === 0) {
        console.log("kongcv_manage_get_market_coupon_list:",ERROR_MSG.ERR_SKIP_MUST_EXIST);
        response.success(ERROR_MSG.ERR_SKIP_MUST_EXIST);
        return;
    }
    
    var limit = request.params.limit;
    if (typeof(limit) == "undefined" || limit.length === 0) {
        console.log("kongcv_manage_get_market_coupon_list:",ERROR_MSG.ERR_LIMIT_MUST_EXIST);
        response.success(ERROR_MSG.ERR_LIMIT_MUST_EXIST);
        return;
    }

    var market_coupon_query = new AV.Query(kongcv_market_coupon_cls);
    market_coupon_query.include("coupon");
    market_coupon_query.skip(skip);
    market_coupon_query.limit(limit);
    market_coupon_query.find({
        success : function(results) {
            for (i = 0; i < results.length; i++) {
                results[i].set("coupon", JSON.stringify(results[i].get("coupon")));
            }
            
            response.success(results);
            return;
        },
        error : function(error) {
            console.log("kongcv_manage_get_market_coupon_list:",error);
            response.error(error);
            return;
        }
    });
});

/**
 * brief   : hook - beforesave, collect - kongcv_accept
 * @param  : request - {"save data"}
 *           response - return success or error
 * @return : success
 *           {"save data"}
 *           error
 *           {"code":142,"error":"xxxxxx"}
 */
AV.Cloud.beforeSave("kongcv_accept", function(request, response) {
    var park_community = request.object.get('park_community'); 
    
    var now_date = new Date();
    var now_minseconds = now_date.getTime();
    var accept_minseconds = now_minseconds - limit_minseconds;
    var accept_date = new Date(accept_minseconds);

    var accept_query = new AV.Query(kongcv_accept_cls);
    if (park_community != undefined) {
        accept_query.equalTo("park_community", park_community);
        accept_query.greaterThan("updatedAt", accept_date);
        accept_query.find({
            success : function(results) {
                var kongcv_accept_obj = new kongcv_accept_cls();
                if (results.length > 0) {
                    console.log("kongcv_accept_beforesave:",ERROR_MSG.ERR_PARK_ACCEPT_EXIST);
                    response.error(ERROR_MSG.ERR_PARK_ACCEPT_EXIST);
                    return;
                }
                else if (0 === results.length) { 
                    response.success();
                }
            },
            error : function(error) {
                console.log("kongcv_accept_beforesave:",error);
                response.error(error);
                return;
            }
        });
    }
    else {
        response.success();
    }
});

/**
 * brief   : hook - beforesave, collect - kongcv_preorder
 * @param  : request - {"save data"}
 *           response - return success or error
 * @return : success
 *           {"save data"}
 *           error
 *           {"code":142,"error":"xxxxxx"}
 */
AV.Cloud.beforeSave("kongcv_preorder", function(request, response) {
    var preorder = request.object.get('preorder');
    var park_community = request.object.get('park_community'); 
    
    var now_date = new Date();
    var now_minseconds = now_date.getTime();
    var preorder_minseconds = now_minseconds - limit_minseconds;
    var preorder_date = new Date(preorder_minseconds);

    var preorder_query = new AV.Query(kongcv_preorder_cls);
    preorder_query.equalTo("park_community", park_community);
    preorder_query.equalTo("preorder", 1);
    preorder_query.greaterThan("updatedAt", preorder_date);
    preorder_query.find({
        success : function(results) {
            var kongcv_preorder_obj = new kongcv_preorder_cls();
            if (results.length > 0) {
                console.log("kongcv_preorder_beforesave:",ERROR_MSG.ERR_PARK_PREORDER_EXIST);
                response.error(ERROR_MSG.ERR_PARK_PREORDER_EXIST);
                return;
            }
            else if (0 === results.length) { 
                var park_query = new AV.Query(kongcv_park_community_cls);

                park_query.get(park_community.id, {
                    success : function(park_obj) {
                        if (0 === park_obj.get("park_space")) {
                            console.log("kongcv_preorder_beforesave:",ERROR_MSG.ERR_PARK_NO_SPACE);
                            response.error(ERROR_MSG.ERR_PARK_NO_SPACE);
                            return;
                        }
                  
                        response.success();
                    },
                    error : function(error) {
                        console.log("kongcv_preorder_beforesave:",error);
                        response.error(error);
                        return;
                    }
                }); 
            }
        },
        error : function(error) {
            console.log("kongcv_preorder_beforesave:",error);
            response.error(error);
            return;
        }
    });
});

/**
 * brief   : hook - beforesave, collect - kongcv_preorder
 * @param  : request - {"save data"}
 *           response - return success or error
 * @return : success
 *           {"save data"}
 *           error
 *           {"code":142,"error":"xxxxxx"}
 */
/*AV.Cloud.beforeSave("kongcv_purse", function(request, response) {
    var amount = request.object.get('amount');
    var money = request.object.get('money');
    var hirer_obj = request.object.get('user'); 
    var purse_obj = request.object;
   
    var purse_query = new AV.Query(kongcv_purse_cls);
    purse_query.equalTo("user", hirer_obj);
    purse_query.limit(1);
    purse_query.find({
        success : function(results) {
            var purse_obj;
            if (1 === results.length) {
                purse_obj = results[0];
                purse_obj.increment("amount", amount);
                purse_obj.increment("money", money);
                console.log("old amount", amount);
                console.log("old money", money);
            }
            response.success();
        },
        error : function(error) {
            response.error(error);
            return;
        }
    });
});*/

/**
 * brief   : hook - aftersave, collect - kongcv_preorder
 * @param  : request - {"save data"}
 *           response - return success or error
 * @return : success
 *           {"save data"}
 *           error
 *           {"code":142,"error":"xxxxxx"}
 */
/*AV.Cloud.afterSave("kongcv_preorder", function(request) {
    var kongcv_preorder_obj = request.object;
    var obj_id = request.object.get('objectId');
    var preorder = request.object.get('preorder');
    var park_community = request.object.get('park_community'); 
    
    var now_date = new Date();
    var now_minseconds = now_date.getTime();
    var preorder_minseconds = now_minseconds - limit_minseconds;
    var preorder_date = new Date(preorder_minseconds);
    console.log("now_date", now_date);
    console.log("preorder_date", preorder_date);

    var preorder_query = new AV.Query(kongcv_preorder_cls);
    preorder_query.equalTo("park_community", park_community);
    //preorder_query.equalTo("preorder", 1);
    preorder_query.greaterThan("updatedAt", preorder_date);
    preorder_query.find({
        success : function(results) {
            if (results.length > 1) {
                kongcv_preorder_obj.destroy({
                    success : function(kongcv_preorder_obj) {
                        console.log("park preorder exist, delete preorder data");
                        return;
                    },
                    error : function(kongcv_preorder_obj, error) {
                        console.log(error);
                        return;
                    }
                });
            }
            else if (0 === results.length) { 
                console.log(ERROR_MSG.ERR_SYSTEM_PREORDER);
                return;
            }
        },
        error : function(error) {
            console.log(error);
            return;
        }
    });
});*/
 
/****************************** test **********************************/
/**
 * brief   : gaode map search
 * @param  : request - {}
 *           response - return map recordset or error
 * @return : RET_OK - success
 *           {recordset json array}
 *           RET_ERROR - system error
 *           {"code":601,"error":"xxxxxx"}
 */
AV.Cloud.define("kongcv_gaode_search", function(request, response) {
    AV.Cloud.httpRequest(
    {url:"http://restapi.amap.com/v3/place/text?&keywords=聚龙话园8&city=beijing&output=json&offset=100&page=1&extensions=all&key=78c23dc6274d1bcfdca843553615f8be"}
    //{url:"http://restapi.amap.com/v3/direction/driving?origin=116.440887,39.930686&destination=116.435293,39.933177&output=json&key=78c23dc6274d1bcfdca843553615f8be"}
    //{url:"http://restapi.amap.com/v3/assistant/inputtips?output=json&city=010&keywords=聚龙花园&key=78c23dc6274d1bcfdca843553615f8be"}
    ).then(
        function(results) {
            response.success(results);
        }
    );
});

module.exports = AV.Cloud;
