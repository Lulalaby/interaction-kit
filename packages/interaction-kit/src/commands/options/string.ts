import type { APIApplicationCommandStringOption } from "discord-api-types/v10";
import { ApplicationCommandOptionType } from "discord-api-types/v10";
import type SlashCommandAutocompleteInteraction from "../../interactions/autocomplete/application-command-autocomplete.js";
import type { Autocomplete } from "../../interactions/autocomplete/types.js";
import type { Optional } from "../../interfaces.js";
import type { SlashChoiceList } from "./choices.js";
import type {
	AutocompleteCommandOptionType,
	BaseBasicOptionArgs,
} from "./option.js";
import { BasicOption } from "./option.js";

interface StringOptionChoiceArgs
	extends Optional<BaseBasicOptionArgs, "required"> {
	choices?: SlashChoiceList<string>;
	autocomplete: never;
}

interface StringAutocompleteArgs
	extends Optional<BaseBasicOptionArgs, "required"> {
	choices: never;
	autocomplete: Autocomplete<SlashCommandAutocompleteInteraction>["autocomplete"];
}

export default class StringOption
	extends BasicOption<APIApplicationCommandStringOption>
	implements Autocomplete<SlashCommandAutocompleteInteraction>
{
	public readonly choices: SlashChoiceList<string> | undefined;

	autocomplete?: Autocomplete<SlashCommandAutocompleteInteraction>["autocomplete"];

	constructor({
		choices,
		autocomplete,
		name,
		description,
		required,
	}: StringOptionChoiceArgs | StringAutocompleteArgs) {
		super({
			type: ApplicationCommandOptionType.String,
			name,
			description,
			required,
		});

		/* eslint-disable-next-line no-negated-condition */
		if (autocomplete != null) {
			this.autocomplete = autocomplete;
		} else {
			this.choices = choices;
		}
	}

	isAutocomplete(
		_payload: APIApplicationCommandStringOption
	): _payload is AutocompleteCommandOptionType<ApplicationCommandOptionType.String> {
		return this.autocomplete != null;
	}

	equals(schema: APIApplicationCommandStringOption): boolean {
		if (schema.autocomplete) {
			if (this.autocomplete == null) {
				return false;
			}

			if (this.choices?._choices.size !== 0) {
				return false;
			}
		} else {
			if (this.autocomplete != null) {
				return false;
			}

			if (
				(this.choices?._choices?.size ?? 0) !== (schema.choices?.length ?? 0)
			) {
				return false;
			}

			const choiceMap = new Map();
			for (const commandOption of this.choices?._choices?.values() ?? []) {
				choiceMap.set(commandOption.name, commandOption.value);
			}

			const choiceEquality =
				schema.choices?.every((choice) => {
					if (!choiceMap.has(choice.name)) {
						return false;
					}

					return choiceMap.get(choice.name) === choice.value;
				}) ?? true;

			if (!choiceEquality) {
				return false;
			}
		}

		return super.equals(schema);
	}

	serialize() {
		const payload = super.serialize();

		if (this.isAutocomplete(payload)) {
			payload.autocomplete = true;
		} else if (this.choices != null) {
			payload.choices = this.choices.serialize();
		}

		return payload;
	}
}
