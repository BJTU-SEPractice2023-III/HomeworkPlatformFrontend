import { Box, FormControl, FormHelperText, InputLabel, MenuItem, Select } from "@suid/material"
import { Accessor, For, Setter, Show, createEffect, createSignal, onMount } from "solid-js"
import { getCurrentYear, isLeapYear } from "../lib/utils"

export default function DateTimePicker(props: { onDateTimeChanged: (date: Date) => void, error: Accessor<boolean>, errorInfo: string }) {
  const [year, setYear] = createSignal(getCurrentYear())
  const [month, setMonth] = createSignal(1)
  const [day, setDay] = createSignal(1)
  const [hour, setHour] = createSignal(0)
  const [min, setMin] = createSignal(0)
  const [sec, setSec] = createSignal(0)

  const { onDateTimeChanged, error, errorInfo } = props;

  createEffect(() => {
    onDateTimeChanged(new Date(year(), month()-1, day(), hour(), min(), sec(), 0))
  })

  const years = () => {
    return Array.from({ length: 25 }, (_, index) => index + getCurrentYear() - 5);
  }
  const months = () => {
    return Array.from({ length: 12 }, (_, index) => index + 1);
  }

  const days = () => {
    const isLeap = isLeapYear(year())
    const days = [-1, 31, isLeap ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    return Array.from({ length: days[month()] }, (_, index) => index + 1);
  }
  const hours = () => {
    return Array.from({ length: 24 }, (_, index) => index);
  }
  const mins = () => {
    return Array.from({ length: 60 }, (_, index) => index);
  }
  const secs = () => {
    return Array.from({ length: 60 }, (_, index) => index);
  }

  function selectList(label: string, value: Accessor<number>, setValue: Setter<number>, range: number[]) {
    return (
      <FormControl error={error()}>
        <InputLabel id={`${label}-select-label`}>{label}</InputLabel>
        <Select
          sx={{
            height: 40
          }}
          labelId={`${label}-select-label`}
          value={value()}
          label={label}
          MenuProps={{
            MenuListProps: {
              sx: {
                maxHeight: 300,
                overflowY: 'auto'
              }
            }
          }}
          onChange={(event) => {
            console.log(event)
            setValue(event.target.value)}}
        >
          <For each={range}>{(item) =>
            <MenuItem value={item}>{`${item}`}</MenuItem>
          }</For>
        </Select>
      </FormControl>
    )
  }

  return (
    <div>
      <div class="flex gap-2 m-t-2 m-b-2">
        {selectList("year", year, setYear, years())}
        {selectList("month", month, setMonth, months())}
        {selectList("day", day, setDay, days())}
        {selectList("hour", hour, setHour, hours())}
        {selectList("min", min, setMin, mins())}
        {selectList("sec", sec, setSec, secs())}
      </div>
      <Show when={error()}>
        <span class="text-xs color-red">{errorInfo}</span>
      </Show>
    </div >
  )
}