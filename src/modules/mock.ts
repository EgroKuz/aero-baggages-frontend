import { dest_root } from "../../target_config.ts";

export const BAGGAGES_MOCK = {
    baggages:[
        {
            id: 1,
            number: "313466769",
            image: `${dest_root}/images/default_image.jpg`,
            weight: 13,
            description: "Красный чемодан",
            active_add: false, // Добавлено поле
            fragility: false,
            status: true,
          },
          {
            id: 2,
            number: "213456765",
            image: `${dest_root}/images/default_image.jpg`,
            weight: 19,
            description: "Синий чемодан",
            active_add: false, // Добавлено поле
            fragility: false,
            status: true,
          },
          {
            id: 3,
            number: "413400769",
            image: `${dest_root}/images/default_image.jpg`,
            weight: 16,
            description: "Серый чемодан",
            active_add: false, // Добавлено поле
            fragility: false,
            status: true,
          },
          {
            id: 4,
            number: "523466399",
            image: `${dest_root}/images/default_image.jpg`,
            weight: 23,
            description: "Черный чемодан",
            active_add: false, // Добавлено поле
            fragility: false,
            status: true,
          },
    ]
}