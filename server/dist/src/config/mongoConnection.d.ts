import 'dotenv/config';
import MongoStore from 'connect-mongo';
/**
 * The class for creating, using, and closing the single connection to the
 * MongoDB database this server is configured for. If in a testing environment,
 * the database will be in memory instead of linking to the URI specified by
 * the .env file.
 */
declare class MongoConnection {
  private static instance;
  private mongoMemoryServer;
  private mongoUri;
  private constructor();
  static getInstance(): Promise<MongoConnection>;
  /**
   * Opens a connection to the MongoDB database the project is configured for
   */
  open(): Promise<void>;
  /**
   * Clears all the collections of the {@link MongoMemoryServer} the
   * instance is connected to. If not connected to an in memory server, nothing
   * occurs. Useful to call in between tests.
   */
  clearInMemoryCollections(): Promise<void>;
  /**
   * @returns A new {@link MongoStore} instance for storing user sessions in
   * the instance's database
   */
  createSessionStore(): MongoStore;
  /**
   * Closes the connection to the MongoDB database for the instance
   */
  close(): Promise<void>;
}
export default MongoConnection;
//# sourceMappingURL=mongoConnection.d.ts.map
