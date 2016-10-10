import { Injectable }                               from "@angular/core";
import { Http, Response, Headers, RequestOptions }  from "@angular/http";
import { Contact }                                  from "./contact.model";
import { Observable }                               from "rxjs/Observable";
import { PageClickedEventArgs }                     from "./contacts-pagination.component";
import 'rxjs/add/observable/from';

@Injectable()
export class ContactsMockService {

  constructor(private http: Http) { }

  private _baseUrl = "app/contacts";  // URL to web API

  public getContacts (): Observable<Contact[]> {
    return this.http
      .get(this._baseUrl)
      .map(this.extractData)
      .catch(this.handleError);
  }

  public getContactsWithSkip (skip: number) {
    return this.http
      .get(this._baseUrl)
      .map(res => {
        let body = res.json();
        let contacts = body.data;
        contacts.splice(0, skip);
        return contacts;
      })
      .catch(this.handleError);
  }

  public getContactsWithSkipAndFilter (pageClickedEventArgs: PageClickedEventArgs) {
    let skip = pageClickedEventArgs.skip;
    let searchString = pageClickedEventArgs.searchString;
    let filterType = pageClickedEventArgs.filterType;
    return this.http
      .get(this._baseUrl)
      .map(res => {
        let body = res.json();
        let contacts: Contact[] = body.data;
        let filteredContacts = contacts
          .filter(c => c[filterType].toLowerCase().indexOf(searchString.toLowerCase()) >= 0)
          .map(c => c); 
        filteredContacts.splice(0, skip);
        return filteredContacts;
      })
      .catch(this.handleError);
  }

  public getContactsCountForFilter (searchString: string, filterType: string) {
    return this.http
      .get(this._baseUrl)
      .map(res => {
        let body = res.json();
        let contacts: Contact[] = body.data;
        let filteredContacts = contacts
          .filter(c => c[filterType].toLowerCase().indexOf(searchString.toLowerCase()) >= 0)
          .map(c => c); 
        return filteredContacts.length;
      })
      .catch(this.handleError);
  }

  public getContactsCount (): Observable<any> {
    return this.http
      .get(this._baseUrl)
      .map(res => {
        let body = res.json();
        let contacts: Contact[] = body.data;
        return contacts.length;
      })
      .catch(this.handleError);
  }

  public addContact (contact: {}): Observable<Contact> {
    let body = JSON.stringify(contact);
    let headers = new Headers({ "Content-Type": "application/json" });
    let options = new RequestOptions({ headers: headers });
    return this.http
      .post(this._baseUrl, body, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  // TODO: return Observable<OdataResponse>
  public editContact (contact: Contact) {
    // return Observable.from<string>("edit Contact not available through Mocked API");
    return this.http
      .get(this._baseUrl)
      .map(res => {
        let body = res.json();
        let contacts: Contact[] = body.data;
        let indexToUpdate;
        for (let contactIndex in  contacts) {
          if (contacts[contactIndex].Id === contact.Id) {
            indexToUpdate = contactIndex;
            break;
          }
        }
        contacts.splice(indexToUpdate, 1, contact);
        return "Contact was edited";
      })
      .catch(this.handleError);
  }

  // TODO: return Observable<OdataResponse>
  public deleteContact (contact: any) {
    // return Observable.from<string>("delete Contact not available through Mocked API");
    return this.http
      .get(this._baseUrl)
      .map(res => {
        let body = res.json();
        let contacts: Contact[] = body.data;
        let indexToDelete;
        for (let contactIndex in  contacts) {
          if (contacts[contactIndex].Id === contact.Id) {
            indexToDelete = contactIndex;
            break;
          }
        }
        contacts.splice(indexToDelete, 1);
        return "Contact was deleted";
      })
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body.data || {};
  }

  private handleError(error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }
}