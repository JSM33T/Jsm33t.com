export interface BlogDetailDto {
    title: string;
    author?: string;
    slug: string;
    content: string;
    category: string;
    coverImageUrl?: string;
    image?: string;
    createdAt?: string;
}


export interface SidebarProps {
    content: string;
    query: string;
    onQueryChange: (q: string) => void;
    onMatchClick: (index: number) => void;
}
