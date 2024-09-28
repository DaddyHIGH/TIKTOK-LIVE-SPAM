const fs = require('fs');
const axios = require('axios');

const randomTexts = fs.readFileSync('messages.txt', 'utf-8').split('\n').filter(Boolean);

const sessionIds = [
  'session id',
  "session",
  "",
  "",
];

async function getPublicIP() {
  try {
    const response = await axios.get('https://api.ipify.org?format=json');
    return response.data.ip;
  } catch (error) {
    console.error('Error fetching public IP:', error);
    return 'Unknown';
  }
}

const saveAccountInfo = (content, language, sessionId) => {
  const accountInfo = { sessionId, content, language };
  const jsonFilePath = `account_info_${sessionId}.json`;
  fs.writeFileSync(jsonFilePath, JSON.stringify(accountInfo, null, 2));
  console.log(`Account info saved for Session ID: ${sessionId}`);
};
async function sendRequest(sessionId, randomContent, i) {
  const url = 'https://webcast16-normal-c-useast1a.tiktokv.com/webcast/room/chat/?iid=7419738215660145429&device_id=7109705346453276166&ac=wifi&channel=googleplay&aid=1233&app_name=musical_ly&version_code=300102&version_name=30.1.2&device_platform=android&os=android&ab_version=30.1.2&ssmix=a&device_type=STK-L21&device_brand=HUAWEI&language=en&os_api=29&os_version=10&openudid=e78297c0aef18904&manifest_version_code=2023001020&resolution=1080*2224&dpi=480&update_version_code=2023001020&_rticket=1692681170963&current_region=IQ&app_type=normal&mcc_mnc=41805&timezone_name=Asia%2FBaghdad&carrier_region_v2=418&residence=IQ&app_language=en&carrier_region=IQ&ac2=wifi&uoo=0&op_region=IQ&timezone_offset=10800&build_number=30.1.2&host_abi=arm64-v8a&locale=en&ts=1692681170&cdid=31e5fde8-8bd4-4cdf-92af-97153ebda575&webcast_sdk_version=2920&webcast_language=en&webcast_locale=en&current_network_quality_info=%7B%22tcp_rtt%22%3A6%2C%22quic_rtt%22%3A6%2C%22http_rtt%22%3A300%2C%22downstream_throughput_kbps%22%3A1400%2C%22quic_send_loss_rate%22%3A-1%2C%22quic_receive_loss_rate%22%3A-1%2C%22net_effective_connection_type%22%3A4%2C%22video_download_speed%22%3A160%7D HTTP/2';

  const headers = {
    'Host': 'webcast16-normal-c-useast1a.tiktokv.com',
    'Cookie': `sessionid=${sessionId}`,
    'Content-Length': 299,
    'Sdk-Version': '2',
    'X-Bd-Kmsv': '0',
    'Multi_login': '1',
    'Passport-Sdk-Version': '19',
    'X-Tt-Dm-Status': 'login=1;ct=1;rt=1',
    'X-Vc-Bdturing-Sdk-Version': '2.3.1.i18n',
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    'X-Tt-Store-Region': 'iq',
    'X-Tt-Store-Region-Src': 'uid',
    'X-Ss-Dp': '1233',
    'User-Agent': 'com.zhiliaoapp.musically/2023001020 (Linux; U; Android 10; en; STK-L21; Build/HUAWEISTK-L21; Cronet/TTNetVersion:06d6a583 2023-04-17 QuicVersion:d298137e 2023-02-13)',
    'Accept-Encoding': 'gzip, deflate',
    'X-Argus': 'kWhYRl7myMW/Q7HxtBYGwSKUbdhJza6vzfnCNLu2adN651fsS1jTnYm+7L3RFPv+snYYsVDPem7JcACBJa2EfM+2LCoorWLhFN9dptjza4r9/MTi3TuFyQKwBZ1d4CdLY2cu/UCvuUgA5n2r0RP+9BG/b9r3by7BhTS1vneP8T7u8ho9fIyy53RWz+IrNp/Y9OO88+LVFEYmj+AfO4QlOne6sCDUmabBzotQHWqbYh/ak7RPaf6XQi5zytrz6ngtAvRt3xx9P0MXxjdAaUxN7a1K3bGrn75j2BxKiaIpm4+L4m2WuNE67hHlqpziPjUPnODYYjNRyPlejJtcOYDlbuKhbEs9wt4y9eHPcUfQpAvq9tk6VQO+KRwYnwhBs+ax72AJZ6vVD5xE+Oco1MHmjZRO22HLItaE0iTyiKe4mc7CgzobecLB//g3N0hKk9or6Na9ZrqjBIErg23PRvpEpyfp40J6FPn0J/E9UISCoSAHXbCFhG0fHJ59ZWaNDDWP8IvfNXUdrqdjNnFzcR/LnGBCbXrLEhInZ0LPAoPZ8ZaLYJoirbnBGJ9myGONXaQDgP7iweCsuEfYAFNWeCil3cbaFhsIXfhQfVS0ysKYedfGnAxjQv1ILWY6d9Y25INcdHk=',
    'X-Gorgon': '84046053100029ed0a03d51403a77bea76781bfd230742a983a4',
    'X-Khronos': '1692681170',
    'X-Ladon': 'XceqNOpwEczGC44hoUJydE7e4TpkpDsnPiQ7StjEaEgPwQLY'
  };

  const requestBody = `room_id=7419738215660145429&emotes_with_index=&anchor_id=6904279249998480390&is_ad=0&input_type=0&enter_source=&post_anyway=0&client_start_timestamp_millisecond=1692681171026&content=${encodeURIComponent(randomContent)}&enter_method=live_cover&enter_from_merge=live_merge&tag=live_ad&request_id=2023082205113596204FBB94E2EF88759B`;

  try {
    const response = await axios.post(url, requestBody, { headers });
    const { data } = response;

    if (data.data.message === "User doesn't login" && data.data.prompts === 'Please login first') {
      console.log(`Session ID: ${sessionId}, User not logged in.`);
    } else {
      console.log(`Session ID: ${sessionId}, Request ${i + 1} response:`, data);
      if (randomTexts.includes(data.data.content)) {
        saveAccountInfo(data.data.content, data.data.content_language, sessionId);
      }
    }
  } catch (error) {
    console.error(`Session ID: ${sessionId}, Error in request ${i + 1}:`, error.response ? error.response.data : error.message);
  }
}

async function sendRequests() {
  const maxIterations = 10;
  const ip = await getPublicIP();
  console.log(`Tool execution started from IP: ${ip}`);

  for (let iteration = 0; iteration < maxIterations; iteration++) {
    for (const sessionId of sessionIds) {
      const promises = randomTexts.map((_, i) => {
        const randomContent = randomTexts[Math.floor(Math.random() * randomTexts.length)];
        return sendRequest(sessionId, randomContent, i);
      });
      await Promise.all(promises);
    }
  }

  console.log('All requests sent');
}
sendRequests();
