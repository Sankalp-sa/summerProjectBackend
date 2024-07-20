// #pragma GCC optimize("O3")
// #pragma GCC optimize("Ofast")
#include <bits/stdc++.h>

#include <ext/pb_ds/assoc_container.hpp>
#include <ext/pb_ds/tree_policy.hpp>
using namespace std;
using namespace __gnu_pbds;
template <class T>
using o_set =
    tree<T, null_type, less<T>, rb_tree_tag, tree_order_statistics_node_update>;
// order_of_key (val): returns the no. of values less than val
// find_by_order (k): returns the kth largest element.(0-based)
#define int long long
typedef pair<int, int> II;
typedef vector<II> VII;
typedef vector<int> VI;
typedef vector<VI> VVI;
typedef long long LL;
#define PB push_back
#define F first
#define S second
#define ALL(a) a.begin(), a.end()
#define SET(a, b) memset(a, b, sizeof(a))
#define SZ(a) (int)(a.size())
#define FOR(i, a, b) for (int i = (a); i < (int)(b); ++i)
#define fast_io                                                                \
    ios_base::sync_with_stdio(false);                                          \
    cin.tie(NULL)
#define deb(a) cerr << #a << " = " << (a) << endl;
#define deb1(a)                                                                \
    cerr << #a << " = [ ";                                                     \
    for (auto it = a.begin(); it != a.end(); it++)                             \
        cerr << *it << " ";                                                    \
    cerr << "]\n";
#define endl "\n"
const long long mod = 1e9 + 7;

template <typename T> struct segTree {
    T unit;
    T (*f)(T obj1, T obj2);
    vector<T> s;
    int n;
    segTree(int n, T (*c)(T obj1, T obj2), T def)
        : s(2 * n, def), n(n), f(c), unit(def) {}
    void update(int pos, T val) {
        for (s[pos += n] = val; pos /= 2;)
            s[pos] = f(s[pos * 2], s[pos * 2 + 1]);
    }
    T query(int b, int e) { // query [b, e]
        e++;
        T ra = unit, rb = unit;
        for (b += n, e += n; b < e; b /= 2, e /= 2) {
            if (b % 2)
                ra = f(ra, s[b++]);
            if (e % 2)
                rb = f(s[--e], rb);
        }
        return f(ra, rb);
    }
};
int join(int a, int b) { return max(a, b); }
void solve() {
    int n;
    cin >> n;
    vector<int> a(n);
    segTree<int> st(n, join, 0);
    FOR(i, 0, n) {
        cin >> a.at(i);
        st.update(i, a[i]);
    }

    VI pge(n, -1);
    VI nge(n, n);
    stack<int> s;
    for (int i = 0; i < n; i++) {
        while (SZ(s) && a[s.top()] <= a[i])
            s.pop();
        if (SZ(s) == 1)
            pge[i] = s.top();
        else if (SZ(s) > 1) {
            cout << 0 << endl;
            return;
        }
        s.push(i);
    }

    int minK = 0;
    int extra = n;
    int laSpecial = n;
    VI cantChange(n, 0);
    int aage = false;
    int maDiff = 0;
    for (int i = n - 1; i >= 0; i--) {
        if (pge[i] != -1) {
            minK = max(minK, a[pge[i]] - a[i]);
            st.update(i, a[pge[i]]);
            cantChange[pge[i]] = 1;
            if (aage) {
                extra = min(extra, maDiff);
            }
        }
        if (cantChange[i]) {
            aage = true;
            maDiff = 0;
        }
        if (aage && i)
            maDiff = max(maDiff, a[i] - a[i - 1]);
    }
    int maK = extra;
    int ans = (maK * (maK + 1)) / 2;
    ans -= (minK * (minK - 1)) / 2;
    cout << max(ans, 0LL) << endl;
}

signed main() {
    fast_io;
    //  freopen("input.txt", "r", stdin);
    //  freopen("output.txt", "w", stdout);
    int totalTests = 1;
    cin >> totalTests;
    for (int testNo = 1; testNo <= totalTests; testNo++) {
        // cout << "Case #" << testNo << ": ";
        solve();
    }
    return 0;
}
