import chai, { expect } from 'chai'
import sinonChai from 'sinon-chai'
// import validate from '../../src/libs/validate1'
import validate from '../../src/libs/validate3'

chai.use(sinonChai)

describe('validate', () => {
  it('存在', () => {
    expect(validate).to.exist
  })

  it('required true 报错', () => {
    let data = {
      email: '',
    }
    let rules = [
      {
        key: 'email',
        required: true,
      },
    ]
    let errors = validate(data, rules)

    expect(errors.email.required).to.eq('必填')
  })

  it('required true 不报错', () => {
    let data = {
      email: 0,
    }
    let rules = [
      {
        key: 'email',
        required: true,
      },
    ]
    let errors = validate(data, rules)

    expect(errors.email).to.not.exist
  })
  it('pattern 报错', () => {
    let data = {
      email: '@frank.com',
    }
    let rules = [
      {
        key: 'email',
        pattern: /^.+@.+$/,
      },
    ]
    let errors = validate(data, rules)

    expect(errors.email.pattern).to.eq('格式不正确')
  })

  it('pattern 通过', () => {
    let data = {
      email: '1@frank.com',
    }
    let rules = [
      {
        key: 'email',
        pattern: /^.+@.+$/,
      },
    ]
    let errors = validate(data, rules)
    expect(errors.email).to.not.exist
  })

  it('pattern email 报错', () => {
    let data = {
      email: '@frank.com',
    }
    let rules = [
      {
        key: 'email',
        pattern: 'email',
      },
    ]

    let errors = validate(data, rules)
    expect(errors.email.pattern).to.eq('格式不正确')
  })

  it('require & pattern', () => {
    let data = {
      email: '',
    }
    let rules = [
      {
        key: 'email',
        pattern: 'email',
        required: true,
      },
    ]

    let errors = validate(data, rules)

    expect(errors.email.required).to.eq('必填')
    expect(errors.email.pattern).to.not.exist
  })

  it('require & minLength', () => {
    let data = {
      email: '',
    }
    let rules = [
      {
        key: 'email',
        pattern: 'email',
        minLength: 6,
      },
    ]

    let errors = validate(data, rules)
    expect(errors.email.minLength).to.exist
    expect(errors.email.pattern).to.exist
  })

  it('maxLength', () => {
    let data = {
      email: '123131213131313',
    }
    let rules = [
      {
        key: 'email',
        pattern: 'email',
        maxLength: 10,
      },
    ]

    let errors = validate(data, rules)
    expect(errors.email.maxLength).to.exist
    expect(errors.email.pattern).to.exist
  })

  it('many keys', () => {
    let data = {
      email: '123131213131313',
    }
    let rules = [
      {
        key: 'email',
        pattern: 'email',
        maxLength: 10,
        hasNumber: true,
      },
    ]

    let fn = () => {
      validate(data, rules)
    }
    expect(fn).to.throw('不存在的校验器：hasNumber')
  })

  it('自定义测试规则', () => {
    let data = {
      email: 'abcd',
    }
    validate.hasNumber = value => {
      if (!/\d/.test(value)) {
        return '必须含有数字'
      }
    }

    let rules = [
      {
        key: 'email',
        required: true,
        hasNumber: true,
      },
    ]
    let errors
    let fn = () => {
      errors = validate(data, rules)
    }

    expect(fn).to.not.throw()
    expect(errors.email.hasNumber).to.eq('必须含有数字')
  })
})
