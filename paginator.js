const DEFAULT_PER_PAGE = 10;
const MAX_ITERATOR_COUNT = 100;

/**
 * function for creating generator from array
 * @param array
 */
function* arrayToGenerator (array) {
    var nextIndex = 0;

    while (nextIndex < array.length) {
        yield array[ nextIndex++ ];
    }
}

/**
 * Function to check whether the iterator object
 * @param obj
 * @returns {boolean}
 */
function isIterated (obj) {
    // checks for null and undefined
    if (obj == null) {
        return false;
    }
    return typeof obj[ Symbol.iterator ] === 'function';
}

class PaginationHelper {
    constructor (collection, itemsPerPage) {
        if (!Number.isInteger(itemsPerPage)) {
            itemsPerPage = DEFAULT_PER_PAGE;
        } else if (itemsPerPage <= 0) {
            itemsPerPage = DEFAULT_PER_PAGE;
        }

        this.itemsPerPage = itemsPerPage;
        if (Array.isArray(collection)) {
            this._itemCount = collection.length;
        } else {
            if (isIterated(collection)) {
                this._itemCount = 0;
                while (this._itemCount < MAX_ITERATOR_COUNT && !collection.next().done) {
                    this._itemCount++;
                }
            } else {
                throw new Error('Incorrect collection type, need Array or Iterator');
            }
        }

    }

    /**
     * Method returns count of pages
     * @returns {number|*}
     */
    pageCount () {
        return Math.ceil(this._itemCount / this.itemsPerPage);
    }

    /**
     * Method returns count of items
     * @returns {*|number}
     */
    itemCount () {
        return this._itemCount;
    }

    /**
     * Method returns the number of items on the current page
     * pageIndex is zero based. This method return -1 for pageIndex values that are out of range
     * @param pageIndex integer
     * @returns {*}
     */
    pageItemCount (pageIndex) {
        var pages = this.pageCount();
        if ((!Number.isInteger(pageIndex)) || pageIndex < 0 || pageIndex >= pages) {
            return -1;
        }
        if (pageIndex < (pages - 1) || (this._itemCount % this.itemsPerPage == 0)) {
            return this.itemsPerPage;
        } else {
            return this._itemCount % this.itemsPerPage;
        }
    }

    /**
     * Method determines what page an item is on.
     * Zero based indexes.
     * This method return -1 for itemIndex values that are out of range
     * @param itemIndex
     * @returns {*}
     */
    pageIndex (itemIndex) {
        if ((!Number.isInteger(itemIndex)) || itemIndex < 0 || itemIndex >= this._itemCount) {
            return -1;
        } else {
            return Math.ceil(itemIndex / this.itemsPerPage);
        }
    }
}

QUnit.test("Pagination module with array", function (assert) {
    var helper = new PaginationHelper([ 'a', 'b', 'c', 'd', 'e', 'f' ], 5);
    assert.equal(helper.pageCount(), 2, "pageCount() boundary condition");
    helper = new PaginationHelper([ 'a', 'b', 'c', 'd', 'e', 'f' ], 3);
    assert.equal(helper.pageCount(), 2, "pageCount() fold amount");

    assert.equal(helper.itemCount(), 6, "itemCount() should == 6");
    assert.equal(helper.pageItemCount(0), 3, "pageItemCount(0) should == 3");
    assert.equal(helper.pageItemCount(1), 3, "pageItemCount(1) should == 3");
    helper = new PaginationHelper([ 'a', 'b', 'c', 'd', 'e', 'f' ], 4);
    assert.equal(helper.pageItemCount(1), 2, "pageItemCount(1) should == 2");
    assert.equal(helper.pageItemCount(2), -1, "pageItemCount(2) should == -1");
    assert.equal(helper.pageItemCount(-3), -1, "pageItemCount(3) should == -1");

    assert.equal(helper.pageIndex(5), 2, "pageItemCount(5) should == 2");
    assert.equal(helper.pageIndex(2), 1, "pageItemCount(2) should == 1");
    assert.equal(helper.pageIndex(20), -1, "pageItemCount(20) should == -1");
    assert.equal(helper.pageIndex(-10), -1, "pageItemCount(-10) should == -1");
});

QUnit.test("Pagination module with iterator", function (assert) {
    var gen = arrayToGenerator([ 'a', 'b', 'c', 'd', 'e', 'f' ]);
    var helper = new PaginationHelper(gen, 5);
    assert.equal(helper.pageCount(), 2, "pageCount() boundary condition");
    gen = arrayToGenerator([ 'a', 'b', 'c', 'd', 'e', 'f' ]);
    helper = new PaginationHelper(gen, 3);
    assert.equal(helper.pageCount(), 2, "pageCount() fold amount");

    assert.equal(helper.itemCount(), 6, "itemCount() should == 6");
    assert.equal(helper.pageItemCount(0), 3, "pageItemCount(0) should == 3");
    assert.equal(helper.pageItemCount(1), 3, "pageItemCount(1) should == 3");
    gen = arrayToGenerator([ 'a', 'b', 'c', 'd', 'e', 'f' ]);
    helper = new PaginationHelper(gen, 4);
    assert.equal(helper.pageItemCount(1), 2, "pageItemCount(1) should == 2");
    assert.equal(helper.pageItemCount(2), -1, "pageItemCount(2) should == -1");
    assert.equal(helper.pageItemCount(-3), -1, "pageItemCount(3) should == -1");

    assert.equal(helper.pageIndex(5), 2, "pageItemCount(5) should == 2");
    assert.equal(helper.pageIndex(2), 1, "pageItemCount(2) should == 1");
    assert.equal(helper.pageIndex(20), -1, "pageItemCount(20) should == -1");
    assert.equal(helper.pageIndex(-10), -1, "pageItemCount(-10) should == -1");
});


QUnit.test("Pagination module with other", function (assert) {
    try {
        var helper = new PaginationHelper({}, 5);
        assert.ok(false, 'Code after error')
    } catch (e) {
        assert.ok(true, 'generated error')
    }
});