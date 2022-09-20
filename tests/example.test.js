import {double} from './example'

test('첫 테스트', () => {
  expect(123).toBe('123')
})

test('인수가 숫자 데이터입니다', () => {
  expect(double(3)).toBe(6)
  expect(double(10)).toBe(20)
})