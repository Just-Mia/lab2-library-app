


/* eslint-disable @typescript-eslint/no-unused-expressions */
import { expect } from 'chai';
import { describe, it } from 'mocha';
import { validateRequired, validateYear, validateNumericId } from '../src/utils/validators';

describe('Validation Helpers Tests', () => {
  it('should validate required non-empty string', () => {
    const res = validateRequired('Test', 'Title');
    expect(res.isValid).to.be.true;
  });

  it('should reject empty required string', () => {
    const res = validateRequired('   ', 'Title');
    expect(res.isValid).to.be.false;
  });

  it('should validate correct 4-digit publication year', () => {
    const res = validateYear('2024');
    expect(res.isValid).to.be.true;
  });

  it('should reject invalid publication year', () => {
    const res = validateYear('1899');
    expect(res.isValid).to.be.false;
  });

  it('should accept strictly numeric User ID', () => {
    const res = validateNumericId('12345');
    expect(res.isValid).to.be.true;
  });

  it('should reject non-numeric User ID', () => {
    const res = validateNumericId('usr_123');
    expect(res.isValid).to.be.false;
  });
});