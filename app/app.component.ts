import { Component, OnInit, ElementRef, Inject }  from "@angular/core";
import { Router, ROUTER_DIRECTIVES }              from "@angular/router";
import { OidcTokenManagerService }                from "./common.services/oidc-token-manager.service";

/*
 * Currently the main application component (i.e this) has the functionality to login or logout.
 * Nevertheless, this behaviour might/should be in a different component, maybe a header.
 */
@Component({
  selector: "app",
  styles: [`
  .brand-logo{
    display: block;
  }
  @media (max-width: 800px) 
  {
      .brand-logo
      {
          display: none;
      }
  }
  .nav-link-active {
    background-color: #455a64;
  }
  `],
  template: require("./app.component.html")
})
export class AppComponent implements OnInit {

  public homeIsActive: boolean;
  public contactsIsActive: boolean;
  private mgr;

  public loggedFlag: boolean;

  public constructor (private _oidcmanager: OidcTokenManagerService,
    private _elRef: ElementRef,
    private _router: Router,
    @Inject("$") private $: any) {

    this.mgr = this._oidcmanager.mgr;
    this.loggedFlag = false;
  }

  public ngOnInit () {
    this.homeIsActive = true;
    this.$(this._elRef.nativeElement)
      .find(".button-collapse")
      .sideNav({
        closeOnClick: true
      });
  }

  // public login() {
  //   this.mgr.redirectForToken();
  // }

  // public logOutOfIdSrv () {
  //   this.mgr.redirectForLogout();
  // }

  public openContactsSecurityMessage() {
    if (this.mgr.expired) {
      this.$(this._elRef.nativeElement)
        .find("#contactsAccessModal").openModal();
    } else {
      this.toContacts();
    }
  }

  public toContacts() {
    this._router.navigate(["/contacts"]);
    if (this._router.isActive) {
      this.contactsIsActive = true;
      this.homeIsActive = false;
    }
  }

  public toHome() {
    this._router.navigate(["/home"]);
    if (this._router.isActive) {
      this.contactsIsActive = false;
      this.homeIsActive = true;
    }
  }

  public cancelToContacts() {
    this.$(this._elRef.nativeElement)
      .find("#contactsAccessModal").closeModal();
  }

  public openLogoutMessage() {
    this.$(this._elRef.nativeElement)
      .find("#logoutModal").openModal();
  }

  public closeLogoutMessage() {
    this.$(this._elRef.nativeElement)
      .find("#logoutModal").closeModal();
  }
}
