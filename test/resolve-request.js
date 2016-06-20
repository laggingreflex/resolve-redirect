import test from 'ava';
import resolveRedirect from '../src';

test('url without protocol', async t => {
  t.throws(resolveRedirect('www.google.com'));
});

test('url with basic redirect', async t => {
  const url = await resolveRedirect('http://google.com/');
  t.is(url, 'http://www.google.com/');
});

test('url without redirect', async t => {
  const url = await resolveRedirect('http://www.google.com/');
  t.is(url, 'http://www.google.com/');
});

test('secure url with redirect', async t => {
  const url = await resolveRedirect('https://google.com/');
  t.is(url, 'https://www.google.com/');
});

test('secure url without redirect', async t => {
  const url = await resolveRedirect('https://www.google.com/');
  t.is(url, 'https://www.google.com/');
});

test('broken url', async t => {
  t.throws(resolveRedirect('http://feedproxy.google.com/~r/Coroflot/AllJobs/~3/69s2F4RGu-k/Designer'));
});
