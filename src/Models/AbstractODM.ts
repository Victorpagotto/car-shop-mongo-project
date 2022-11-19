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

  public async findAll(): Promise<HydratedDocument<T>[]> {
    return this.dbModel.find({});
  }

  public async destroy(id: string): Promise<boolean> {
    const result = await this.dbModel.deleteOne({ id });
    return !!result.deletedCount;
  }

  public async update(id: string, info: Partial<T>): Promise<HydratedDocument<T> | null> {
    return this.dbModel.findOneAndUpdate({ id }, { info }, { upsert: false });
  }
}
