import { Category } from "@/Model/Category";
import { httpContext } from "jcc-express-mvc";
import { Inject, Method } from "jcc-express-mvc/Core/Dependency";

@Inject()
export class CategoriesController {
  /**
   *@access public
   * @return  Express Request Response
   */
  async create({ req, res, next } = httpContext) {
    //
  }
  /**
   *@access public
   * @return  Express Request Response
   */
  async index({ req, res, next } = httpContext) {
    const categories = Category.with("jobs").paginate(req);
    // return res.json({
    //   data: categories,
    // });
    return categories;
  }

  /**
   *
   *@access public
   * @return Express Request Response
   */
  async store({ req, res, next } = httpContext) {
    //
  }

  /**
   *@access public
   *@param {id} - string
   * @return Express Request Response
   */
  async show({ req, res, next } = httpContext) {
    //
  }

  /**
   *
   *@access public
   * @param {id} - string
   * @return Express Request Response
   */
  async update({ req, res, next } = httpContext) {
    //
  }

  /**
   *@access public
   * @param  {id} - string
   * @return Express Response
   */
  async destroy({ req, res, next } = httpContext) {
    //
  }
}
