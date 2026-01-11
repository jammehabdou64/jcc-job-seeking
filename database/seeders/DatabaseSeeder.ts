import { UserSeeder } from "./UserSeeder";
import { CategorySeeder } from "./CategorySeeder";
import { JobSeeder } from "./JobSeeder";

export class DatabaseSeeder {
  async run() {
    //
    return [UserSeeder, CategorySeeder, JobSeeder];
  }
}
