import type { Review } from '../types/review';

export const reviews: Review[] = [
  {
    'id': '6af6f711-c28d-4121-82cd-e0b462a27f00',
    'date': '2019-05-08T14:13:56.569Z',
    'user': {
      'name': 'Angelina',
      'avatarUrl': 'img/avatar-angelina.jpg',
      'isPro': false
    },
    'comment': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec tincidunt aliquet sodales. Morbi mi purus, gravida ac tellus a, pretium aliquet nulla. Mauris scelerisque volutpat est at gravida. Maecenas vel ipsum volutpat, imperdiet erat sit amet, vulputate diam. Nullam ante sapien, aliquet a mauris ac, ultrices ornare diam. Curabitur malesuada accumsan ligula id pharetra. In facilisis mauris metus, sed luctus felis tempor eget.',
    'rating': 4
  },
  {
    'id': '6af6f711-c28d-4121-82cd-e0b462a27f00',
    'date': '2019-06-09T14:13:56.569Z',
    'user': {
      'name': 'Oliver Conner',
      'avatarUrl': 'img/avatar-max.jpg',
      'isPro': true
    },
    'comment': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque venenatis lobortis mauris sit amet posuere. Fusce sit amet quam fringilla, eleifend tellus eget, mollis orci.',
    'rating': 5
  },
  {
    'id': 'f644d71b-def4-4a05-9878-f557b80f3ae0',
    'date': '2019-05-10T14:13:56.569Z',
    'user': {
      'name': 'Oliver Conner',
      'avatarUrl': 'img/avatar-max.jpg',
      'isPro': true
    },
    'comment': 'Aenean ut nibh quis eros commodo cursus fermentum non enim. Integer in malesuada orci, vel pulvinar dolor. Sed tellus nibh, ornare vel congue eget, fermentum condimentum nunc.',
    'rating': 5
  }
];
