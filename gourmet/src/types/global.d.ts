export {};

declare global {
    interface RecipeType {
        id: number,
        created_at: string,
        name: string,
        description: string,
        instructions: string,
        created_by: string,
        calories: number,
        cost: number,
        prep_time: number,
        cook_time: number,
        servings: number,
        image_url: string,
        disclaimer: string,
        when_to_eat: string
    }
}