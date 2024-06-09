import dayjs from "dayjs";

export default class GeneralHelpers {
    /**
     * Get next possible working day for vacation
     * @returns dayjs.Dayjs
     */
    static getNextWorkingDay() {
        const dayOfWeek = dayjs().day()
        if (dayOfWeek == 4) {
            return dayjs().add(3, "days")
        } else if (dayOfWeek == 5) {
            return dayjs().add(2, "days")
        } else {
            return dayjs().add(1, "days")
        }
    }
}