class APIFeatures {
  constructor(mQuery, reqQueryObj) {
    this.mQuery = mQuery;
    this.reqQueryObj = reqQueryObj;
  }

  filter() {
    const queryObj = { ...this.reqQueryObj };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach(ef => delete queryObj[ef]);

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);

    this.mQuery = this.mQuery.find(JSON.parse(queryStr));

    return this;
  }

  sort() {
    if (this.reqQueryObj.sort) {
      const sortBy = this.reqQueryObj.sort.replace(/,/g, ' ');
      this.mQuery = this.mQuery.sort(sortBy);
    } else {
      this.mQuery = this.mQuery.sort('-createdAt');
    }

    return this;
  }

  limitFields() {
    if (this.reqQueryObj.fields) {
      const selectedFields = this.reqQueryObj.fields.replace(/,/g, ' ');
      this.mQuery = this.mQuery.select(selectedFields);
    } else {
      this.mQuery = this.mQuery.select('-__v');
    }

    return this;
  }

  paginate() {
    const page = this.reqQueryObj.page * 1 || 1;
    const limit = this.reqQueryObj.limit * 1 || 100;
    const skip = (page - 1) * limit;
    this.mQuery.skip(skip).limit(limit);
    return this;
  }
}

module.exports = APIFeatures;