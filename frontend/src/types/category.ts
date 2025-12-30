export enum CategoryType {
  INCOME = 'income',
  EXPENSE = 'expense',
}

export interface Category {
  id: number
  name: string
  color: string
  icon: string
  type: CategoryType
  userId: number
}

export interface CreateCategoryDTO {
  name: string
  color: string
  icon: string
  type: CategoryType
}

export interface UpdateCategoryDTO extends CreateCategoryDTO {
  id: number
}
