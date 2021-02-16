export class StringUtil {

    public static hashCodeForString(text: string): number {
      let hash = 0;
  
      if (text.length === 0) {
        return hash;
      }
  
      const len = text.length;
      for (let i = 0; i < len; i++) {
        const chr = text.charCodeAt(i);
        hash = ((hash << 5) - hash) + chr;
        hash |= 0; 
      }
      return hash;
    }

    public static isNullOrEmpty<T extends { length: number }>(value: T) {
      return (!value || value == null || value.length <= 0);
    }
    
    public static toArray<T>(set: Set<T>): T[] {
      return [...Array.from<T>(set)];
    }
  
    public static intersect<T>(set1: Set<T>, set2: Set<T>): Set<T> {
      return new Set(StringUtil.toArray(set1).filter((x) => set2.has(x)));
    }
  
    public static difference<T>(set1: Set<T>, set2: Set<T>): Set<T> {
      return new Set(StringUtil.toArray(set1).filter((x) => !set2.has(x)));
    }
  
    public static union<T>(set1: Set<T>, set2: Set<T>): Set<T> {
      return new Set([...StringUtil.toArray(set1), ...StringUtil.toArray(set2)]);
    }
  }