﻿import { Http, Headers }            from "@angular/http";
import { Injectable, Inject }       from "@angular/core";
import { Observable }               from "rxjs/Observable";
import { OidcTokenManagerService }  from "./oidc-token-manager.service"

@Injectable()
export class HttpExtendedService {

  private _mgr: any;

  public constructor (private _http: Http, 
    private _oidcToken: OidcTokenManagerService,
    @Inject("BASE_URL") private _baseUrl: string) {

    this._mgr = _oidcToken.mgr;
  }

  private checkApiCall (url: string, headers: Headers) : Headers {
    let apiUrl = this._baseUrl + "odata";
    headers.set("Accept", "application/json");
    if (RegExp(apiUrl).test(url)) {
      headers.set('Authorization', 'Bearer ' + this._mgr.access_token);
    }     
    return headers;
  }

  public get (url) {
    let headers = new Headers();
    return this._http.get(url, {
      headers: this.checkApiCall(url, headers)
    });
  }

  public post (url, data) {
    let headers = new Headers();
    headers.set("Content-Type", "application/json");
    return this._http.post(url, data, {
      headers: this.checkApiCall(url, headers)
    });
  }

  public patch (url, data) {
    let headers = new Headers();
    headers.set("Content-Type", "application/json");
    return this._http.patch(url, data, {
      headers: this.checkApiCall(url, headers)
    });
  }

  public delete (url) {
    let headers = new Headers();
    return this._http.delete(url, {
      headers: this.checkApiCall(url, headers)
    });
  }
}
