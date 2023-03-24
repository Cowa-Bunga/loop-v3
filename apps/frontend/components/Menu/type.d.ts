interface IMenuItem {
  id?: string;
  title: string;
  link?: string;
  action?: () => void;
  icon?: string;
  permission?: string[]
}

interface IMenu {
  id?: string;
  title: string;
  link?: string;
  action?: () => void;
  icon?: string;
  permission?: string[]
  children?: IMenuItem[];
}
