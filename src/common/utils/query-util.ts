export class QueryUtil {

  static like(columnName: string, keyword: string): string {
    return `${columnName} LIKE '%${keyword}%'`;
  }

}