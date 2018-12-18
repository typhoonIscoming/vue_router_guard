import {Validator} from 'vee-validate';

const validator=new Validator()

let trimStr = function(str){return str?str.replace(/(^\s*)|(\s*$)/g,""):'';}
export const isMobile = {
  messages: {
    // cn: (field, args) => field + '必须是11位手机号码'
    cn: (field, args) => field + '格式错误'
  },
  validate: (value, args) => {
    return trimStr(value).length === 11 && /^1[3456789]\d{9}$/.test(value)
  }
}

Validator.extend('mobile', isMobile)
