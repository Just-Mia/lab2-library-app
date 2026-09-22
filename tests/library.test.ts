/* eslint-disable @typescript-eslint/no-unused-expressions */
import { expect } from 'chai';
import { Library } from '../src/services/Library';

declare const describe: (name: string, fn: () => void) => void;
declare const it: (name: string, fn: () => void) => void;
declare const beforeEach: (fn: () => void) => void;

interface TestItem {
  id: string;
  name: string;
}

describe('Library Generic Class Tests', () => {
  let library: Library<TestItem>;

  beforeEach(() => {
    library = new Library<TestItem>();
  });

  it('should add items to the collection', () => {
    library.addItem({ id: '1', name: 'Item 1' });
    expect(library.getAll().length).to.equal(1);
  });

  it('should find item by id', () => {
    const item = { id: '100', name: 'Unique Item' };
    library.addItem(item);

    const found = library.findById('100');
    expect(found).to.deep.equal(item);
  });

  it('should remove item by id', () => {
    library.addItem({ id: '1', name: 'Item 1' });
    const isRemoved = library.removeItem('1');

    expect(isRemoved).to.be.true;
    expect(library.getAll().length).to.equal(0);
  });
});