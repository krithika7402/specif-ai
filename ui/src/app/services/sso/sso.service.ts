import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SsoService {
  constructor() {}

  getUserCredentials(provider: string): Promise<{ name: string }> {
    return window.electronAPI.invoke('sso:getUserCredentials', provider);
  }

  initiateSSO(provider: string): Promise<any> {
    return window.electronAPI.invoke('sso:initiate', provider);
  }
}
