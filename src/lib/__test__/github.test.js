/* eslint-env jest */
const github = require('../github')

describe('github', () => {
  test('Validate username', async () => {
    expect(github.validUser('hello world')).toBe(false)
    expect(github.validUser('helloworld')).toBe(true)
    expect(github.validUser('-helloworld')).toBe(false)
    expect(github.validUser('hugo world')).toBe(false)
  })

  test('Fetch key', async () => {
    expect(github.getUserKey('hello world')).rejects.toThrow('Invalid username format')
    expect(github.getUserKey('hugorodrigues')).resolves.toBe('ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAACAQC2xky55uWXjPKQUa3lfhaby8SaqgCcXxWspJERaxsF2ZY4iedLAmwUjOu85/NZFr1ks30PNmqm5W30fsc2MpFADIzvqT110xP9hVAW2GBmgHfT/PcKa0ce5Wd7cdIcRzcFUY/TiAroqmh7fxcIXIVVi/Rghf+gqQ813/qk2cW/e+CfjVBxbYexJdZBwWQDMnlTcr5s599UaGM/P0YDsf4UeWFGRDLJ3QTgBOk8213QeqtjKJsE3OL87yQL6NgjpqOr+R2Ih3AgzGKQ63pf5tpu+3vsXGaT6kkSetSM9hE1F3yE7l7QWHln1Bjzr+R9VcRNN3vTMp3MLCRWuI5f9PQVPXsmfUptPX/ysa/fazp9/eO2R9qA3FJyWhuPUD6nkEYMZ8rrQxbf4i4aGQtS0lKZx05ye+Nw6Y+xP0TyZYR3kG12yGJlt2noJrxZnvXb32UwFDkbIG73p++ygR79gQgOtnesQeVdgBHouuTjDR1n4jWUqWQGEzcUg16HYodbO93P0c1IZp0PusrGWogNTmHcMh1Anml9ysmwy8RFL9iu0Fi/dn8IGzZu1WF/lE+mK1rn4aLJ2vKDiyecOk1HxH1YUy2byr0AjFJyPV9QQPi9HOyo43z/F0EU54E/W3+BdJreD6VXWXRJmV25Z9Ly42HjfGTrq055W9vzr3sUl8dk0w==')
  })
})
