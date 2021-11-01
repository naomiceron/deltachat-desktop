export type Credentials = {
  [key: string]: any
  addr?: string
  mail_user?: string
  mail_pw?: string
  mail_server?: string
  mail_port?: string
  mail_security?: 'automatic' | '' | 'ssl' | 'default'
  imap_certificate_checks?: any
  send_user?: string
  send_pw?: string
  send_server?: string
  send_port?: string
  send_security?: 'automatic' | '' | 'ssl' | 'starttls' | 'plain'
  smtp_certificate_checks?: any
  socks5_enabled: string
  socks5_host: string
  socks5_port: string
  socks5_user: string
  socks5_password: string
}

export interface DesktopSettings {
  bounds:
    | {
        height: number
        width: number
        x: number
        y: number
      }
    | {}
  chatViewBgImg?: string
  /** @deprecated replaced by lastAccount */
  credentials?: Credentials
  /** path to last used/selected Account */
  lastAccount?: number
  enableAVCalls: boolean
  enableChatAuditLog: boolean
  enableOnDemandLocationStreaming: boolean
  enterKeySends: boolean
  locale: string | null
  notifications: boolean
  showNotificationContent: boolean
  lastChats: { [accountId: number]: number }
  zoomFactor: number
  /** address to the active theme file scheme: "custom:name" or "dc:name" */
  activeTheme: string
  minimizeToTray: boolean
  syncAllAccounts: boolean
}

export interface AppState {
  saved: DesktopSettings
  logins: DeltaChatAccount[]
}

export interface RC_Config {
  'log-debug': boolean
  'log-to-console': boolean
  'machine-readable-stacktrace': boolean
  'multiple-instances': boolean
  theme: string | undefined
  'theme-watch': boolean
  devmode: boolean
  'translation-watch': boolean
  minimized: boolean
}

import { App } from 'electron'
import { LocaleData } from '../shared/localize'
import { QrState } from '../shared/constants'

export interface ExtendedApp extends App {
  rc: RC_Config
  isQuitting: boolean
  ipcReady: boolean
  localeData?: LocaleData
  state?: AppState
}

import type { Contact } from 'deltachat-node'
import { C } from 'deltachat-node/dist/constants'

export type ContactJSON = ReturnType<typeof Contact.prototype.toJson>
export interface ChatListItemType {
  /** chat id */
  id: number
  name: string
  avatarPath: string
  color: string
  lastUpdated: number
  summary:
    | {
        text1: any
        text2: any
        state: MessageState
      }
    | undefined
  isContactRequest: boolean
  isProtected: boolean
  isGroup: boolean
  freshMessageCounter: number
  isArchiveLink: boolean
  contactIds: number[]
  isSelfTalk: boolean
  isDeviceTalk: boolean
  selfInGroup: boolean
  archived: boolean
  pinned: boolean
  muted: boolean
}

import type { Chat, Message as DCNMessage } from 'deltachat-node'

export type JsonChat = ReturnType<typeof Chat.prototype.toJson>

export type JsonContact = ReturnType<typeof Contact.prototype.toJson>

export type JsonLocations = {
  accuracy: number
  latitude: number
  longitude: number
  timestamp: number
  contactId: number
  msgId: number
  chatId: number
  isIndependent: boolean
  marker: string
}[] // ReturnType<typeof DeltaChat.prototype.getLocations>

export type MessageQuote = {
  messageId: number
  text: string
  displayName: string
  displayColor: string
  overrideSenderName: string
}

export type NormalMessage = ReturnType<typeof DCNMessage.prototype.toJson> & {
  type: MetaMessageIs.Normal
  sender: JsonContact
  setupCodeBegin: string | null
  file_mime: string | null
  file_bytes: number | null
  file_name: string | null
  quote: MessageQuote | null
}

export type DayMarkerMessage = {
  type: MetaMessageIs.DayMarker
  timestamp: number
}

export type MarkerOneMessage = {
  type: MetaMessageIs.MarkerOne
  count: number
}

export enum MetaMessageIs {
  MarkerOne = 0,
  DayMarker = 1,
  Normal = 2,
}

export type MetaMessage = MarkerOneMessage | DayMarkerMessage | NormalMessage


export type NormalMessageAttachmentSubset = Pick<
  NormalMessage,
  'file' | 'file_mime' | 'file_bytes' | 'file_name'
>

export interface FullChat {
  id: number
  name: string
  isProtected: boolean
  profileImage: string
  archived: boolean
  type: number
  isUnpromoted: boolean
  isSelfTalk: boolean
  contacts: JsonContact[]
  contactIds: number[]
  color: string
  freshMessageCounter: number
  isGroup: boolean
  isContactRequest: boolean
  isDeviceChat: boolean
  selfInGroup: boolean
  muted: boolean
  ephemeralTimer: number
}

export type todo = any

export type MessageStatusString =
  | 'error'
  | 'sending'
  | 'draft'
  | 'delivered'
  | 'read'
  | 'sent'
  | ''



export type Theme = {
  name: string
  description: string
  address: string
  /** whether the theme is a prototype and should be hidden in the selection unless deltachat is started in devmode */
  is_prototype: boolean
}

export type MessageSearchResult = {
  id: number
  authorProfileImage: string
  author_name: string
  author_color: string
  chat_name: null | string
  message: string
  timestamp: number
}

export type DeltaChatAccount =
  | { id: number; type: 'unconfigured' }
  | {
      id: number
      type: 'configured'
      display_name: string | null
      addr: string | null
      profile_image: string | null
      color: string
    }

export declare type QrCodeResponse = {
  state: QrState
  id: number
  text1: string
}
export type MarkerOneParams = {
  [key: number]: number
}

export const enum MessageState {
  IN_FRESH = C.DC_STATE_IN_FRESH,
  IN_NOTICED = C.DC_STATE_IN_NOTICED,
  OUT_DELIVERED = C.DC_STATE_OUT_DELIVERED,
  OUT_DRAFT = C.DC_STATE_OUT_DRAFT,
  OUT_FAILED = C.DC_STATE_OUT_FAILED,
  OUT_MDN_RCVD = C.DC_STATE_OUT_MDN_RCVD,
  OUT_PENDING = C.DC_STATE_OUT_PENDING,
  OUT_PREPARING = C.DC_STATE_OUT_PREPARING,
}