import { SubscriptionHistory } from "./SubscriptionHistory";




export class Subscription {
    idSub: number;
    numAbn: number;
    dateDebut: Date;
    dateExpiration: Date;
    price: number;
    subType: SubscriptionType;
    //subscriptionHistories: SubscriptionHistory[];
}
export enum SubscriptionType {
    ANNUEL = 'ANNUEL',
    MENSUEL = 'MENSUEL',
    SEMESTRIEL = 'SEMESTRIEL'
  }
  
