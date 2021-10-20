/**
 * These type definitions come from the official Discord API docs. They should
 * be defined with references back to the documentation section.
 */


import { GuildMember } from "./guild-members";
import { Attachment } from "./attachments";
import { Embed } from "./embeds";
import { Snowflake } from "./snowflakes";
import { User } from "./users";
import { Channel } from "./channels";
import { Component } from "./components";
import { Reaction } from "./reactions";
import { StickerItem } from "./stickers";
import { MessageInteraction } from "./application-commands";

// TODO: Document
export enum PermissionFlags {
	EPHEMERAL = 1 << 6,
	LOADING = 1 << 7,
}

/** @link https://discord.com/developers/docs/resources/channel#message-object-message-structure */
export type Message = {
    id: Snowflake;
    channel_id: Snowflake;
    guild_id?: Snowflake;
    author: User; // TODO: Check how this works if the message was generated by a webhook (see footnotes https://discord.com/developers/docs/resources/channel#message-object-message-structure)
    member?: GuildMember;
    content: string;
    timestamp: Date; // TODO: validate
    edited_timestamp: Date | null;
    tts: boolean;
    mention_everyone: boolean;
    mentions: UserMention[];
    mention_roles: Snowflake[];
    mention_channels?: Snowflake[];
    attachments: Attachment[];
    embeds: Embed[];
    reaction?: Reaction[];
    nonce?: string | number;
    pinned: boolean;
    webhook_id?: Snowflake;
    type: MessageType;
    activity?: MessageActivity;
    application?: unknown; // TODO: type this
    application_id?: Snowflake;
    message_reference?: MessageReference;
    flags?: number;
    referenced_message?: Message | null;
    interaction?: MessageInteraction;
    thread?: Channel;
    components?: Component[];
    sticker_items?: StickerItem[];
};

// TODO: check if there is a better way to do this
export type UserMention = {
    id: Snowflake;
    username: string;
    avatar: string;
    discriminator: string;
    public_flags: number;
    bot?: boolean;
};

/** @link https://discord.com/developers/docs/resources/channel#message-reference-object-message-reference-structure */


/** @link https://discord.com/developers/docs/resources/channel#message-reference-object-message-reference-structure */
export type MessageReference = {
    message_id?: Snowflake;
    channel_id?: Snowflake;
    guild_id?: Snowflake;
    fail_if_not_exists?: boolean;
};

/** @link https://discord.com/developers/docs/resources/channel#message-object-message-types */
export enum MessageType {
    DEFAULT = 0,
    RECIPIENT_ADD = 1,
    RECIPIENT_REMOVE = 2,
    CALL = 3,
    CHANNEL_NAME_CHANGE = 4,
    CHANNEL_ICON_CHANGE = 5,
    CHANNEL_PINNED_MESSAGE = 6,
    GUILD_MEMBER_JOIN = 7,
    USER_PREMIUM_GUILD_SUBSCRIPTION = 8,
    USER_PREMIUM_GUILD_SUBSCRIPTION_TIER_1 = 9,
    USER_PREMIUM_GUILD_SUBSCRIPTION_TIER_2 = 10,
    USER_PREMIUM_GUILD_SUBSCRIPTION_TIER_3 = 11,
    CHANNEL_FOLLOW_ADD = 12,
    GUILD_DISCOVERY_DISQUALIFIED = 4,
    GUILD_DISCOVERY_REQUALIFIED = 15,
    GUILD_DISCOVERY_GRACE_PERIOD_INITIAL_WARNING = 16,
    GUILD_DISCOVERY_GRACE_PERIOD_FINAL_WARNING = 17,
    THREAD_CREATED = 18,
    REPLY = 19,
    CHAT_INPUT_COMMAND = 20,
    THREAD_STARTER_MESSAGE = 21,
    GUILD_INVITE_REMINDER = 22,
    CONTEXT_MENU_COMMAND = 23,
};

/** @link https://discord.com/developers/docs/resources/channel#message-object-message-activity-structure */
export type MessageActivity = {
    type: number;
    party_id?: string;
}