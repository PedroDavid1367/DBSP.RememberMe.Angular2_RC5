import { provide }                             from "@angular/core";  
import { OidcTokenManagerService }             from "./common.services/oidc-token-manager.service";
import { HttpExtendedService }                 from "./common.services/http-extended.service";
import { AutoLinkerService }                   from "./common.services/auto-linker.service";

import {HTTP_PROVIDERS, Http, Request, RequestOptionsArgs, Response, XHRBackend,
  RequestOptions, ConnectionBackend, Headers}  from "@angular/http";
import { InMemoryBackendService, SEED_DATA }   from "angular2-in-memory-web-api";
import { ContactsData }                        from "./mocked-data/contacts-data";

let $ = require("jquery");

export const APP_PROVIDERS = [
  //provide("BASE_URL", { useValue: "http://localhost:7338/" }),  // RememberMe REST API Application (development)
  provide("BASE_URL", { useValue: "http://localhost:8887/" }),    // RememberMe REST API Application (production)
  provide("$", { useValue: $ }),
  OidcTokenManagerService,
  AutoLinkerService,
  HttpExtendedService,  // Used until a proper interceptor has been implemented 
  { provide: XHRBackend, useClass: InMemoryBackendService },  // in-mem server
  { provide: SEED_DATA, useClass: ContactsData }              // in-mem server data
];

