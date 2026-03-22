drop policy if exists "Anyone can insert form submissions" on public.form_submissions;

create or replace function public.submit_public_form_submission(
  p_form_type text,
  p_email text,
  p_name text,
  p_organization_name text default null,
  p_message text default ''
)
returns public.form_submissions
language plpgsql
security definer
set search_path = public
as $$
declare
  normalized_email text := lower(trim(coalesce(p_email, '')));
  normalized_name text := trim(coalesce(p_name, ''));
  normalized_message text := trim(coalesce(p_message, ''));
  recent_count integer;
  max_submissions integer;
  inserted_row public.form_submissions;
begin
  if p_form_type not in ('contact', 'kit_request') then
    raise exception 'Unsupported form type.';
  end if;

  if normalized_email = '' then
    raise exception 'Email is required.';
  end if;

  if normalized_name = '' then
    raise exception 'Name is required.';
  end if;

  if normalized_message = '' then
    raise exception 'Message is required.';
  end if;

  max_submissions := case
    when p_form_type = 'contact' then 3
    when p_form_type = 'kit_request' then 2
    else 0
  end;

  select count(*)
  into recent_count
  from public.form_submissions
  where form_type = p_form_type
    and lower(email) = normalized_email
    and created_at >= timezone('utc', now()) - interval '10 minutes';

  if recent_count >= max_submissions then
    raise exception 'Rate limit exceeded. Please wait before submitting again.';
  end if;

  insert into public.form_submissions (
    form_type,
    email,
    name,
    organization_name,
    message
  )
  values (
    p_form_type,
    normalized_email,
    normalized_name,
    nullif(trim(coalesce(p_organization_name, '')), ''),
    normalized_message
  )
  returning *
  into inserted_row;

  return inserted_row;
end;
$$;

revoke all on function public.submit_public_form_submission(text, text, text, text, text) from public;
grant execute on function public.submit_public_form_submission(text, text, text, text, text) to anon, authenticated;
