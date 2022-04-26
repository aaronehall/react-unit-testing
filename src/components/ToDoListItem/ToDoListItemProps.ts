export interface ToDoListItemProps {
    name: string;
    index: number;
    handleDeleteItem: (index: number) => void;
}