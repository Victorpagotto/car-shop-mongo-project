import { HydratedDocument, model, Model, models, Schema } from 'mongoose';

export default abstract class AbstractODM<T> {
  protected dbModel: Model<T>;
  protected schema: Schema;
  protected dbModelName: string;

  constructor(schema: Schema, dbModelName: string) {
    this.schema = schema;
    this.dbModelName = dbModelName;
    this.dbModel = models[this.dbModelName] || model(this.dbModelName, this.schema);
  }

  public async create(object: Partial<T>): Promise<HydratedDocument<T>> {
    return this.dbModel.create({ ...object });
  }

  public async get(object: Partial<T>): Promise<HydratedDocument<T>[]> {
    return this.dbModel.find({ ...object });
  }

  public async getById(id: string): Promise<HydratedDocument<T> | null> {
    return this.dbModel.findById(id);
  }

  public async destroy(id: string): Promise<boolean> {
    const result = await this.dbModel.deleteOne({ _id: id });
    return !!result.deletedCount;
  }

  public async getAndUpdate(id: string, info: Partial<T>): Promise<HydratedDocument<T> | null> {
    return this.dbModel.findByIdAndUpdate(id, { ...info }, { upsert: false, new: true });
  }
}
