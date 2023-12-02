import { A } from "@solidjs/router"
import { Card, CardContent, Typography } from "@suid/material"
import { formatDateTime } from "../lib/utils"
import { Match, Switch } from "solid-js"
import { Notification, NotificationType } from "../lib/user"
import { Homework } from "../lib/homework"

export default function NotificationCard(props: { notification: Notification }) {
  const { notification } = props

  function isHomework() {
    return notification.notificationType == NotificationType.LearningHomeworkInProgressNotification ||
      notification.notificationType == NotificationType.LearningHomeworkCommentInProgressNotification ||
      notification.notificationType == NotificationType.TeachingHomeworkInProgressNotification ||
      notification.notificationType == NotificationType.TeachingHomeworkCommentInProgressNotification
  }

  function title() {
    if (notification.notificationType == NotificationType.LearningHomeworkInProgressNotification) {
      return "未完成的作业"
    } else if (notification.notificationType == NotificationType.LearningHomeworkCommentInProgressNotification) {
      return "未完成互评的作业"
    } else if (notification.notificationType == NotificationType.TeachingHomeworkInProgressNotification) {
      return "正在进行中的作业"
    } else if (notification.notificationType == NotificationType.TeachingHomeworkCommentInProgressNotification) {
      return "正在互评中的作业"
    } else if (notification.notificationType == NotificationType.ComplaintInProgressNotification) {
      return "正在等待处理的申诉"
    } else if (notification.notificationType == NotificationType.ComplaintToBeSolvedNotification) {
      return "未处理的申诉"
    }
  }

  function link() {
    if (isHomework()) {
      const { courseId, ID } = (notification.notificationData as Homework)
      return `/course/${courseId}/homeworks/${ID}`
    } else {
      return ``
    }
  }

  function linkText() {
    if (isHomework()) {
      const { name } = (notification.notificationData as Homework)
      return name
    } else {
      return ``
    }
  }

  function description() {
    if (isHomework()) {
      const { description } = (notification.notificationData as Homework)
      return description
    } else {
      return ``
    }
  }

  return (
    <Card>
      <CardContent>
        <Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {title()}
          </Typography>
          <Typography variant="h5" component="div">
            <A href={link()} class='text-black no-underline hover:underline'>
              {linkText()}
            </A>
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {description()}
          </Typography>
          <Switch>
            <Match when={isHomework()}>
              <Typography variant="body2">
                开始日期：{formatDateTime(notification.notificationData.beginDate)}
                <br />
                结束日期：{formatDateTime(notification.notificationData.endDate)}
              </Typography>
            </Match>
            <Match when={!isHomework()}>

            </Match>
          </Switch>
        </Typography>
      </CardContent>
    </Card>
  )
}