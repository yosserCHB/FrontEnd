export class Reclamation {
    //idReclamation?: number;
    title!: string;
    status!: ReclamationType;
    content!: string;
    userName!: string;
   // user: User; 
}
export enum ReclamationType {
    NEW = 'NEW',
    IN_PROGRESS = 'IN_PROGRESS',
    RESOLVED = 'RESOLVED',
    CLOSED = 'CLOSED'
  }