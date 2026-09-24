import { Component } from '@angular/core';
import { MenuItemComponent } from '../menu-item/menu-item';
import { MenuItem } from '../../models/menu-item';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [MenuItemComponent],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css'
})
export class SidebarComponent {

  menuItems: MenuItem[] = [

    {
      title: 'Profile',
      link: '#',
      component: 'ProfileComponent'
    },

    {
      title: 'Messages',
      link: '#',
      component: 'MessagesComponent'
    },

    {
      title: 'Settings',
      link: '#',
      component: 'SettingsComponent',

      children: [

        {
          title: 'Account',
          link: '#',
          component: 'AccountComponent'
        },

        {
          title: 'Profile',
          link: '#',
          component: 'ProfileSettingsComponent'
        },

        {
          title: 'Security & Privacy',
          link: '#',
          component: 'SecurityComponent'
        },

        {
          title: 'Password',
          link: '#',
          component: 'PasswordComponent'
        },

        {
          title: 'Notification',
          link: '#',
          component: 'NotificationComponent'
        }

      ]
    },

    {
      title: 'Help',
      link: '#',
      component: 'HelpComponent',

      children: [

        {
          title: 'FAQs',
          link: '#',
          component: 'FaqComponent'
        },

        {
          title: 'Submit a Ticket',
          link: '#',
          component: 'TicketComponent'
        },

        {
          title: 'Network Status',
          link: '#',
          component: 'NetworkStatusComponent'
        }

      ]
    },

    {
      title: 'Logout',
      link: '#',
      component: 'LogoutComponent'
    }

  ];

}