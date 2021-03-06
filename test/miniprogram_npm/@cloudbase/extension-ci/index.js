module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = { exports: {} }; __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); if(typeof m.exports === "object") { Object.keys(m.exports).forEach(function(k) { __MODS__[modId].m.exports[k] = m.exports[k]; }); if(m.exports.__esModule) Object.defineProperty(__MODS__[modId].m.exports, "__esModule", { value: true }); } else { __MODS__[modId].m.exports = m.exports; } } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1614041951499, function(require, module, exports) {
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const js_base64_1 = require("js-base64");
const parser = __importStar(require("fast-xml-parser"));
function parsePath(key, pic) {
    if (pic.indexOf('/') === 0) {
        return pic;
    }
    const idx = key.lastIndexOf('/');
    if (idx === -1) {
        return pic;
    }
    return key.slice(0, idx + 1) + pic;
}
const ActionType = {
    DetectLabel: 'DetectLabel',
    DetectType: 'DetectType',
    WaterMark: 'WaterMark',
    ImageProcess: 'ImageProcess'
};
function callFunction(tcb, options) {
    return __awaiter(this, void 0, void 0, function* () {
        let ciRes;
        try {
            ciRes = yield tcb.callFunction(options);
        }
        catch (err) {
            let errMessage = `[@cloudbase/extension-ci] ???????????????????????? ;  ${err.code ? err.code : ''} ${err.message ? err.message : ''}`;
            if (err.message && err.message.indexOf('??????????????????FunctionName') > -1) {
                throw new Error('[@cloudbase/extension-ci] ????????????????????????');
            }
            if (err.errMsg && err.errMsg.indexOf('??????????????????FunctionName') > -1) {
                errMessage = '[@cloudbase/extension-ci] ????????????????????????';
            }
            throw new Error(errMessage);
        }
        if (ciRes.code) {
            if (ciRes.message && ciRes.message.indexOf('??????????????????FunctionName') > -1) {
                throw new Error('[@cloudbase/extension-ci] ????????????????????????');
            }
            throw new Error(`[@cloudbase/extension-ci] ???????????????????????? ;  ${ciRes.requestId ? ciRes.requestId : ''} ; ${ciRes.code} ; ${ciRes.message}`);
        }
        const { code } = ciRes.result || {};
        if (code) {
            throw new Error(`[@cloudbase/extension-ci] ${code} ; ${ciRes.requestId ? ciRes.requestId : ''} ;`);
        }
        return ciRes.result;
    });
}
exports.name = 'CloudInfinite';
function invoke(opts, tcb) {
    return __awaiter(this, void 0, void 0, function* () {
        let { cloudPath, fileContent, action, operations } = opts;
        if (!action || !ActionType[action]) {
            throw new Error('[@cloudbase/extension-ci] action?????????????????????');
        }
        cloudPath = cloudPath.indexOf('/') === 0 ? cloudPath.slice(1) : cloudPath;
        const headers = {};
        let method;
        if (fileContent) {
            if (!(fileContent instanceof Uint8Array || fileContent instanceof ArrayBuffer)) {
                throw new Error('[@cloudbase/extension-ci] fileContent????????????Uint8Array????????????ArrayBuffer??????');
            }
        }
        let query;
        if (action === ActionType.DetectLabel) {
            method = 'GET';
            query = {
                'ci-process': 'detect-label'
            };
        }
        else if (action === ActionType.DetectType) {
            method = 'GET';
            if (!operations.type) {
                throw new Error('[@cloudbase/extension-ci] DetectType??????type???????????????');
            }
            query = {
                'ci-process': 'sensitive-content-recognition',
                'detect-type': operations.type
            };
            delete operations.type;
        }
        else if (action === ActionType.ImageProcess) {
            query = 'image_process';
            method = 'POST';
            if (fileContent) {
                method = 'PUT';
                query = undefined;
            }
        }
        else if (action === ActionType.WaterMark) {
            method = fileContent ? 'PUT' : 'POST';
            if (method === 'POST') {
                query = 'image_process';
            }
            operations.rules.some((rule) => {
                if (typeof rule !== 'object') {
                    throw new Error('[@cloudbase/extension-ci] WaterMark,rule???????????????');
                }
            });
            for (const processRule of operations.rules) {
                const { rule } = processRule;
                if ((rule.type === 1 || rule.type === 2) && rule.image) {
                    if (rule.image.indexOf('/') === 0) {
                        rule.image = rule.image.slice(1);
                    }
                    processRule.rule = `watermark/${rule.mode}/type/${rule.type}/image/${rule.image}`;
                }
                else if (rule.type === 3 && rule.text) {
                    processRule.rule = `watermark/${rule.mode}/type/${rule.type}/text/${js_base64_1.Base64.encode(rule.text).replace(/\//g, '_').replace(/=/g, '').replace(/\+/g, '-')}`;
                }
                else {
                    throw new Error('[@cloudbase/extension-ci] WaterMark,rule????????????');
                }
            }
        }
        if (operations) {
            headers['Pic-Operations'] = JSON.stringify(operations);
        }
        const functionOpts = {
            name: 'tcb_extension_ci',
            data: {
                key: cloudPath,
                action,
                query: typeof query === 'object' ? query : null,
                headers,
                method
            }
        };
        const ciRes = yield callFunction(tcb, functionOpts);
        let { authorization, token, url, headers: headerRes, cosFileId } = ciRes || {};
        let options;
        if (method === 'PUT') {
            if (!cosFileId) {
                const metaDataRes = yield tcb.getUploadMetadata({ cloudPath });
                cosFileId = metaDataRes.data.cosFileId;
            }
            options = {
                url,
                headers: Object.assign(Object.assign({}, headerRes), { 'x-cos-security-token': token, 'x-cos-meta-fileid': cosFileId, Authorization: authorization }),
                method,
                body: fileContent
            };
        }
        else {
            if (method === 'POST') {
                const fileIds = operations.rules.map((rule) => rule.fileid).filter((fileid) => !!fileid);
                if (fileIds && fileIds.length > 0) {
                    let filePath = parsePath(cloudPath, fileIds[0]);
                    filePath = filePath.indexOf('/') === 0 ? filePath.slice(1) : filePath;
                    if (!cosFileId) {
                        const metaDataRes = yield tcb.getUploadMetadata({ cloudPath: filePath });
                        cosFileId = metaDataRes.data.cosFileId;
                    }
                }
            }
            let newUrl;
            let queryStr;
            if (query && typeof query === 'object') {
                queryStr = Object.keys(query).map((key) => `${key}=${query[key]}`).join('&');
            }
            else if (query && typeof query === 'string') {
                queryStr = query;
            }
            newUrl = url;
            if (url.indexOf('?') > -1) {
                newUrl += `&${queryStr}`;
            }
            else {
                newUrl += `?${queryStr}`;
            }
            options = {
                url: newUrl,
                headers: Object.assign(Object.assign({}, headerRes), { Authorization: authorization, 'x-cos-security-token': token }),
                method: method.toUpperCase()
            };
            if (method === 'POST' && cosFileId) {
                options.headers['x-cos-meta-fileid'] = cosFileId;
            }
        }
        const body = yield tcb.requestClient[method.toLowerCase()](options);
        if (body && body.data) {
            const parseRes = parser.parse(body.data);
            if (parseRes && parseRes.UploadResult && parseRes.UploadResult.OriginalInfo && parseRes.UploadResult.OriginalInfo.Location) {
                parseRes.UploadResult.OriginalInfo.Location = parseRes.UploadResult.OriginalInfo.Location.replace(/cos\.ap-([a-z]+)\.myqcloud\.com/, 'tcb.qcloud.la');
            }
            if (parseRes && parseRes.UploadResult && parseRes.UploadResult.ProcessResults
                && parseRes.UploadResult.ProcessResults.Object && parseRes.UploadResult.ProcessResults.Object.Location) {
                parseRes.UploadResult.ProcessResults.Object.Location = parseRes.UploadResult.ProcessResults.Object.Location.replace(/cos\.ap-([a-z]+)\.myqcloud\.com/, 'tcb.qcloud.la');
            }
            body.data = parseRes;
        }
        return body;
    });
}
exports.invoke = invoke;

}, function(modId) {var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1614041951499);
})()
//# sourceMappingURL=index.js.map