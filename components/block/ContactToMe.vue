<script setup lang="ts">
import { ContactToMeOptions } from '~/constants'
</script>
<template>
  <form
    action="https://getform.io/f/rb2j3JbW"
    method="POST"
    class="flex flex-col gap-3"
  >
    <BaseInput :label="$t('contact_to_me.name')" name="name" />
    <BaseInput :label="'Email'" name="email" />

    <input type="hidden" name="_yes" style="display: none !important" />

    <fieldset class="grid grid-cols-[min-content_1fr] items-center">
      <legend class="col-span-2">{{ $t('contact_to_me.for_what') }}</legend>

      <BaseRadio
        name="for_what"
        :label="$t('contact_to_me.option_interesting')"
        :value="ContactToMeOptions.Interesting"
        checked
      />

      <BaseRadio
        name="for_what"
        :label="$t('contact_to_me.option_working')"
        :value="ContactToMeOptions.Working"
      />

      <BaseRadio
        name="for_what"
        :label="$t('contact_to_me.option_consulting')"
        :value="ContactToMeOptions.Consulting"
      />

      <BaseRadio
        name="for_what"
        :label="$t('contact_to_me.option_others')"
        :value="ContactToMeOptions.Others"
      />
    </fieldset>

    <BaseInput :label="$t('contact_to_me.message')" name="message" />

    <button type="submit">Send</button>
  </form>
</template>
