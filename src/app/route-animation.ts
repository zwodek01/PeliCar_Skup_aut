import { transition, trigger, query, style, animate } from '@angular/animations';

export const opacityAnimation =
    trigger('routeAnimations', [
        transition('* => *', [
            query(
                ':enter',
                [style({ opacity: 0 })],
                { optional: true }
            ),
            query(
                ':leave',
                [style({ opacity: 1 }), animate('.5s', style({ opacity: 0 }))],
                { optional: true }
            ),
            query(
                ':enter',
                [style({ opacity: 0 }), animate('.5s', style({ opacity: 1 }))],
                { optional: true }
            )
        ])
    ]);
