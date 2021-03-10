import { Injectable } from '@angular/core'

declare let localStorage: any

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(
  ) {
  }

  save(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value))
  }

  load(key: string) {
    const localData = localStorage.getItem(key)
    if (localData) {
      return JSON.parse(localData)
    }
    return false
  }

}
