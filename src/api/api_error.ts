export class ApiError extends Error {
    public status?: number;
    constructor(message: string, status?: number) {
        super(message);
        this.status = status;
    }
}

export class GetPokemonError extends Error {
    constructor(public readonly name: string, public readonly url: string) {
        super(`Error fetching Pokemon ${name} (${url})`);
    }
}
