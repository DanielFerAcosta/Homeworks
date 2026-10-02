export interface MenuItem {
  title: string;
  link?: string;
  component?: string;
  children?: MenuItem[];
}