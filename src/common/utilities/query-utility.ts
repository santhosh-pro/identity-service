export class QueryUtility {

  static likeQueryHelper(columnName: string, keyword: string): string {
    return `${columnName} LIKE '%${keyword}%'`;
  }

}