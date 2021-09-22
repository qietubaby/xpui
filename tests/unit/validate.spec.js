import chai, { expect } from 'chai'
import sinonChai from 'sinon-chai'
import validate from '../../src/libs/validate'

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
    let errors = new validate().validate(data, rules)

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
    let errors = new validate().validate(data, rules)

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
    let errors = new validate().validate(data, rules)

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
    let errors = new validate().validate(data, rules)
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

    let errors = new validate().validate(data, rules)
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

    let errors = new validate().validate(data, rules)
    expect(errors.email.required).to.eq('必填')
    expect(errors.email.pattern).to.exist
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

    let errors = new validate().validate(data, rules)

    expect(errors.email.minLength).to.exist
    expect(errors.email.pattern).to.exist
  })

  it('自定义测试规则', () => {
    let data = {
      email: 'abcabcabcabc',
    }
    let validator1 = new validate()

    validator1.hasNumber = value => {
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
      errors = validator1.validate(data, rules)
    }

    expect(fn).to.not.throw()
    expect(errors.email.hasNumber).to.eq('必须含有数字')
  })

  it('两个 validator 互相不影响', () => {
    let data = {
      email: 'abcabcabcabc',
    }
    let validator1 = new validate()
    let validator2 = new validate()
    validator1.hasNumber = value => {
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

    expect(() => {
      validator1.validate(data, rules)
    }).to.not.throw()
    expect(() => {
      validator2.validate(data, rules)
    }).to.throw()
  })
})

it('添加公共规则', () => {
  let data = {
    email: 'abcabcabcabc',
  }
  let validator1 = new validate()
  let validator2 = new validate()
  console.log('---------------------------------------------')
  console.log(validator1.a)

  validator1.add('hasNumber', value => {
    if (!/\d/.test(value)) {
      return '必须含有数字'
    }
  })

  let rules = [
    {
      key: 'email',
      required: true,
      hasNumber: true,
    },
  ]

  expect(() => {
    validator1.validate(data, rules)
  }).to.not.throw()
  expect(() => {
    validator2.validate(data, rules)
  }).to.not.throw()
})
