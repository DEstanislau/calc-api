import { intervalToDuration, parseISO, isBefore } from 'date-fns';

class CalcController {
  async store(request, response) {
    const daytimeHours = [];
    const nightHours = [];

    const { initial_time, final_time } = request.body;

    const initialTime = parseISO(initial_time);
    const finalTime = parseISO(final_time);

    const time = intervalToDuration({
      start: initialTime,
      end: finalTime,
    });

    if (isBefore(finalTime, initialTime)) {
      return response.status(401).json({
        error: 'the end date cannot be earlier than the start date.',
      });
    }

    if (time.days > 0) {
      return response.status(401).json({
        error: 'the time difference must be less than 24 hours.',
      });
    }

    for (
      let timeBetween = initialTime.getHours();
      timeBetween !== finalTime.getHours();
      timeBetween++
    ) {
      if (timeBetween >= 5 && timeBetween <= 22) {
        daytimeHours.push(timeBetween);
      } else if (timeBetween === 23 || timeBetween < 5) {
        nightHours.push(timeBetween);
        if (timeBetween === 23) {
          timeBetween = -1;
        }
      }
    }

    return response.json({
      daytimeHours,
      nightHours,
    });
  }
}

export default new CalcController();
