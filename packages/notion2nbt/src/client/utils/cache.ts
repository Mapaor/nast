/**
 * Cache management for Notion2NBT client (disabled by default)
 */

export class Cache {
  private store: Map<string, any>
  private enabled: boolean

  constructor(enabled: boolean = false) {
    this.store = new Map()
    this.enabled = enabled
  }

  public isEnabled(): boolean {
    return this.enabled
  }

  public setEnabled(enabled: boolean): void {
    this.enabled = enabled
  }

  public get<T = any>(key: string): T | undefined {
    if (!this.enabled) return undefined
    return this.store.get(key)
  }

  public set<T = any>(key: string, value: T): void {
    if (!this.enabled) return
    this.store.set(key, value)
  }

  public has(key: string): boolean {
    if (!this.enabled) return false
    return this.store.has(key)
  }

  public delete(key: string): boolean {
    return this.store.delete(key)
  }

  public clear(): void {
    this.store.clear()
  }

  public size(): number {
    return this.store.size
  }
}
