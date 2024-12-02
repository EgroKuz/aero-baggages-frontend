import { BaggageResult } from "./airBaggagesAPI";

export const BAGGAGES_MOCK: BaggageResult = {
    baggages:[
        {
            'id': 1,
            'number': '313466769',
            'image': 'http://127.0.0.1:9000/baggages/1.jpg',
            'weight': 13,
            'description': 'Красный чемодан'
        },
        {
            'id': 2,
            'number': '213456765',
            'image': 'http://127.0.0.1:9000/baggages/2.jpg',
            'weight': 19,
            'description': 'Синий чемодан'
        },
        {
            'id': 3,
            'number': '413400769',
            'image': 'http://127.0.0.1:9000/baggages/3.jpg',
            'weight': 16,
            'description': 'Серый чемодан'
        },
        {
            'id': 4,
            'number': '523466399',
            'image': 'http://127.0.0.1:9000/baggages/4.jpg',
            'weight': 23,
            'description': 'Черный чемодан'
        }
    ]
}