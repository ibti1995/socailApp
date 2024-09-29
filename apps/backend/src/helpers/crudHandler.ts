import { Document, Model } from 'mongoose';

const NO_MODEL_ERROR = 'No model provided';
const INVALID_ID_ERROR = 'Invalid ID provided';
const INVALID_FILTERS_ERROR = 'Filters object should not be empty';

interface CrudHandlerParams<T extends Document> {
  model: Model<T>;
  data?: Partial<T>;
  populate?: string;
  select?: string;
  filters?: Record<string, unknown>;
  offset?: number;
  limit?: number;
  sort?: string;
  distinct?: string;
  id?: string;
}

interface CreateParams<T extends Document> {
  model: Model<T>;
  data: Partial<T>;
  populate?: string;
  select?: string;
}

type GetListParams<T extends Document> = CrudHandlerParams<T>;

interface GetByIdParams<T extends Document> extends CrudHandlerParams<T> {
  id: string;
}

type GetOneParams<T extends Document> = CrudHandlerParams<T>;

interface UpdateParams<T extends Document> extends CrudHandlerParams<T> {
  id: string;
  data: Partial<T>;
}

interface DeleteParams<T extends Document> extends CrudHandlerParams<T> {
  filters: Record<string, unknown>;
}

const crudHandler = {
  async create<T extends Document>({
    model,
    data,
    populate = '',
    select = '',
  }: CreateParams<T>) {
    try {
      if (!model) throw new Error(NO_MODEL_ERROR);
      if (!data) throw new Error('No data provided for creation');
      const created = await new model(data).save();
      if (created) {
        return await crudHandler.getById<T>({
          model,
          populate,
          select,
          id: created._id.toString(),
        });
      }
      throw new Error('Error creating document');
    } catch (err) {
      return { error: err.message || 'Unknown error' };
    }
  },

  async getList<T extends Document>({
    model,
    populate,
    filters = {},
    offset = 0,
    limit = 10,
    sort = '',
    select = '-password', // Exclude password by default
    distinct = '',
  }: GetListParams<T>) {
    try {
      if (!model) throw new Error(NO_MODEL_ERROR);

      const query = model
        .find(filters)
        .populate(populate)
        .skip(offset)
        .limit(limit)
        .sort(sort)
        .select(select);

      if (distinct) query.distinct(distinct);

      const list = await query.exec();
      const counts = await model.countDocuments(filters);
      return { list, counts };
    } catch (err) {
      return { error: err.message || 'Unknown error' };
    }
  },

  async getById<T extends Document>({
    model,
    id,
    populate = '',
    select = '',
  }: GetByIdParams<T>) {
    try {
      if (!model) throw new Error(NO_MODEL_ERROR);
      if (!id) throw new Error(INVALID_ID_ERROR);

      const document = await model
        .findById(id)
        .populate(populate)
        .select(select)
        .exec();
      if (!document) throw new Error('Document not found');
      return document;
    } catch (err) {
      return { error: err.message || 'Unknown error' };
    }
  },

  async getOne<T extends Document>({
    model,
    filters = {},
    populate = '',
    select = '',
  }: GetOneParams<T>) {
    try {
      if (!model) throw new Error(NO_MODEL_ERROR);
      if (Object.keys(filters).length === 0)
        throw new Error(INVALID_FILTERS_ERROR);

      const document = await model
        .findOne(filters)
        .populate(populate)
        .select(select)
        .exec();
      if (!document) throw new Error('Document not found');
      return document;
    } catch (err) {
      return { error: err.message || 'Unknown error' };
    }
  },

  async getCounts<T extends Document>({
    model,
    filters = {},
  }: CrudHandlerParams<T>) {
    try {
      if (!model) throw new Error(NO_MODEL_ERROR);

      const count = await model.countDocuments(filters);
      return count;
    } catch (err) {
      return { error: err.message || 'Unknown error' };
    }
  },

  async update<T extends Document>({
    model,
    id,
    data = {},
    populate = '',
    select = '',
  }: UpdateParams<T>) {
    try {
      if (!model) throw new Error(NO_MODEL_ERROR);
      if (!id) throw new Error(INVALID_ID_ERROR);

      const documentExists = await crudHandler.getById<T>({ model, id });
      if (!documentExists) throw new Error('Document to update not found');

      await model.updateOne(
        { _id: id },
        { $set: data },
        { omitUndefined: true }
      );
      return await crudHandler.getById<T>({ model, id, populate, select });
    } catch (err) {
      return { error: err.message || 'Unknown error' };
    }
  },

  async updateById<T extends Document>({
    model,
    id,
    data = {},
    populate = '',
    select = '',
  }: UpdateParams<T>) {
    try {
      if (!model) throw new Error(NO_MODEL_ERROR);
      if (!id) throw new Error(INVALID_ID_ERROR);

      const documentExists = await crudHandler.getById<T>({ model, id });
      if (!documentExists) throw new Error('Document to update not found');

      await model.updateOne(
        { _id: id },
        { $set: data },
        { omitUndefined: true }
      );

      return await crudHandler.getById<T>({ model, id, populate, select });
    } catch (err) {
      return { error: err.message || 'Unknown error' };
    }
  },

  async delete<T extends Document>({ model, filters }: DeleteParams<T>) {
    try {
      if (!model) throw new Error(NO_MODEL_ERROR);
      if (!filters || Object.keys(filters).length === 0)
        throw new Error(INVALID_FILTERS_ERROR);

      const deletionResult = await model.deleteOne(filters);
      if (deletionResult.deletedCount === 0)
        throw new Error('Document not found or already deleted');
      return { success: true };
    } catch (err) {
      return { error: err.message || 'Unknown error' };
    }
  },
};

export default crudHandler;
